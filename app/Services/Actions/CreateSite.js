'use strict'

const Ssh = use('App/Services/Actions/Ssh')
const randomNumber = use('random-number-between')

class CreateSite extends Ssh {
  /**
   * Initialize a new site creation
   * @param {App/Models/User} user
   * @param {App/Models/Site} site
   * @param {App/Models/Server} server
   */
  constructor ({ user, site, server }) {
    // instantiate the parent ssh class.
    super({
      user: 'root',
      host: server.stats.networks.v4[0].ip_address,
      identityKey: user.sshkey.name
    })

    this.site = site
    this.user = user
    this.server = server
    this.port = randomNumber(49153, 65534)[0]
  }

  /**
   * Setup a new site on server
   *
   * @return {child_process}
   */
  async setup () {
    const sshProcess = await this.runScript('create-site', `${this.site.name} ${this.port} ${this.site.settings.ionaSubdomainName}`)

    return sshProcess
  }
}

module.exports = CreateSite
