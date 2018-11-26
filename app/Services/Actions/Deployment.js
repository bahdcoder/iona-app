'use strict'

const Ssh = use('App/Services/Actions/Ssh')
const randomNumber = use('random-number-between')

class Deployment extends Ssh {
  /**
   * Initialize a deployment
   *
   * @param {App/Models/User} user
   * @param {App/Models/Site} site
   * @param {App/Models/Server} server
   */
  constructor (user, site, server) {
    super({
      user: 'root',
      host: server.toJSON().stats.networks.v4[0].ip_address,
      identityKey: user.toJSON().sshkey.name
    })

    this.site = site.toJSON()
    this.user = user.toJSON()
    this.server = server.toJSON()
    this.port = this.site.settings.port || randomNumber(49153, 65534)[0]
  }

  /**
   * Deploy an application.
   *
   * @return {child_process}
   */
  async deploy () {
    const script = this.site.deployments.length === 0 ? 'first-site-deploy' : 'deploy'
    const preStartScript = this.site.settings.environment.find(env => env.key === 'IONA_PRE_START') || `"echo 'No prestart script fouund.'"`
    const postStartScript = this.site.settings.environment.find(env => env.key === 'IONA_POST_START') || `"echo 'No poststart script found.'"`
    let environmentVariables = ''

    this.site.settings.environment.forEach(envVariable => {
      if (envVariable.key !== 'IONA_PRE_START' && envVariable !== 'IONA_POST_START') {
        environmentVariables += `"${envVariable.key}='${envVariable.value}'" `
      }
    })

    const deploymentProcess = await this.runScript(script, `${this.site.name} ${this.site.settings.repo.clone_url} ${this.port} ${preStartScript} ${postStartScript} ${environmentVariables}`)

    return deploymentProcess
  }
}

module.exports = Deployment
