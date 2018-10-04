'use strict'

const { validateAll } = use('Validator')
const DigitalOcean = use('App/Services/Api/DigitalOcean')

class DropletController {
  /**
   * Get sizes and regions
   * 
   * @return {Object} response with json sizes and regions
   */
  async getSizesAndRegions({ auth }) {
    const user = await auth.getUser()

    const digitalocean = new DigitalOcean(user)
    const sizes = await digitalocean.getSizes()
    const regions = await digitalocean.getRegions()

    return { sizes, regions }
  }

  async createDroplet({ request, response }) {
    const data = request.all()
    const rules = {
      name: 'required',
      size: 'required',
      region: 'required',
    }
    const validation = await validateAll(data, rules)

    if (validation.fails()) {
      return response.status(422).json(validation.errors)
    }

    const user = await auth.getUser()

    const digitalocean = new DigitalOcean(user)

    const droplet = await digitalocean.create(data)

    return droplet
  }
}

module.exports = DropletController
