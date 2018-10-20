'use strict'

const Server = use('App/Models/Server')
const { validateAll } = use('Validator')
const Resource = use('App/Models/Resource')
const DigitalOcean = use('App/Services/Api/DigitalOcean')

class DropletController {
  /**
   * Get sizes and regions
   *
   * @return {Object} response with json sizes and regions
   */
  async getSizesAndRegions ({ auth }) {
    const user = await auth.getUser()

    const digitalocean = new DigitalOcean(user)
    const sizes = await digitalocean.getSizes()
    const regions = await digitalocean.getRegions()

    return { sizes, regions }
  }

  async store ({ request, response, auth }) {
    const data = request.all()
    const rules = {
      name: 'required',
      size: 'required',
      region: 'required'
    }
    const validation = await validateAll(data, rules)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    const resources = (await Resource.query().whereIn('id', data.resources).fetch()).toJSON()

    const user = await auth.getUser()

    const digitalocean = new DigitalOcean(user)

    const { droplet, resourceSettings } = await digitalocean.createServer(data, resources)

    // return 'done'

    const server = await Server.create({
      user_id: user.id,
      name: droplet.name,
      stats: JSON.stringify(droplet)
    })

    for (const resource of resources) {
      await server.resources().attach(resource.id, raw => {
        raw.settings = JSON.stringify(resourceSettings)
      })
    }

    return server
  }
}

module.exports = DropletController
