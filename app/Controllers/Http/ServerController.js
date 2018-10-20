'use strict'

const Server = use('App/Models/Server')
const DigitalOcean = use('App/Services/Api/DigitalOcean')

class ServerController {
  /**
   * Get all servers for the current user.
   *
   * @param {object} context.auth
   * @param {object} context.params
   * @param {object} context.response
   */
  async index ({ auth, params, response }) {
    const user = await auth.getUser()
    const servers = await user.servers().fetch()

    return servers
  }
  /**
   * Get a single server.
   */
  async show ({ auth, params, response }) {
    const user = await auth.getUser()

    const digitalocean = new DigitalOcean(user)

    const server = await Server.query().with('resources').where({ id: params.id }).first()

    if (!server) {
      return response.status(404).json({ message: 'Not found.' })
    }

    const { id, status } = JSON.parse(server.stats)

    if (status === 'new') {
      const doServer = await digitalocean.getDroplet(id)

      if (doServer.status === 'active') {
        server.stats = JSON.stringify(doServer)

        await server.save()

        return server
      }

      return server
    }

    return server
  }
}

module.exports = ServerController
