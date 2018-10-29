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
      region: 'required',
      database: 'required|in:postgresql,mysql,none'
    }
    const validation = await validateAll(data, rules)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    const user = await auth.getUser()

    const digitalocean = new DigitalOcean(user)

    const { droplet, databaseSettings } = await digitalocean.createServer(data)

    // TODO: generate the default environment variables to be set on all new sites on this server.
    let defaultEnvs = []

    if (data.database !== 'none') {
      defaultEnvs = [{
        key: 'DB_DATABASE',
        value: databaseSettings.database
      }, {
        key: 'DB_USER',
        value: databaseSettings.username
      }, {
        key: 'DB_PASSWORD',
        value: databaseSettings.password
      }]
    }

    console.log('------>', defaultEnvs, databaseSettings)

    const server = await Server.create({
      user_id: user.id,
      name: droplet.name,
      stats: ss(droplet),
      settings: ss({
        defaultEnvs
      })
    })

    return server
  }
}

module.exports = DropletController
