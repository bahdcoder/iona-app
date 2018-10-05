'use strict'

const Redis = use('Redis')
const Resource = use('App/Models/Resource')

class ResourceController {
  async index ({ response }) {
    let resources = await Redis.get('resources')

    if (resources) {
      return JSON.parse(resources)
    }

    resources = await Resource.all()

    await Redis.set('resources', JSON.stringify(resources))

    return response.send(resources)
  }
}

module.exports = ResourceController
