'use strict'

const Ws = use('Ws')
const User = use('App/Models/User')
const Site = use('App/Models/Site')
const Server = use('App/Models/Server')
const Deployment = use('App/Models/Deployment')
const DeploymentService = use('App/Services/Actions/Deployment')

class DeploymentController {
  /**
   * Create a new site deployment.
   *
   * @return {json}
   */
  async store ({ params, auth }) {
    const server = await Server.findOrFail(params.server)
    const user = await User.query().where({ id: auth.user.id }).with('sshkey').firstOrFail()
    const site = await Site.query().where({ id: params.site }).with('deployments').firstOrFail()

    const service = (new DeploymentService(user, site, server))
    const deploymentProcess = await service.deploy()
    let log = ''

    deploymentProcess.stdout.on('data', buffer => {
      log += buffer.toString()

      const topic = Ws.getChannel('sites:*')
        .topic(`sites:${site.id}`)

      if (topic) {
        topic.broadcast('deployment', buffer.toString())
      }

      console.log(buffer.toString())
    })

    deploymentProcess.stderr.on('data', buffer => {
      console.log(
        'NEW ERROR RECEIVED: ==========================>',
        buffer.toString()
      )
    })

    deploymentProcess.stdout.on('close', async status => {
      console.log('0--------------------------->', 'DEPLOYMENT CLOSED.')
      await Deployment.create({
        site_id: site.id,
        log,
        status
      })
    })

    return {
      message: 'ok'
    }
  }
}

module.exports = DeploymentController
