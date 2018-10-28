'use strict'

const { exec } = use('child_process')
const randomNumber = use('random-number-between')

class Deployment {
  /**
   * Initialize a deployment
   * @param {App/Models/User} user
   * @param {App/Models/Site} site
   * @param {App/Models/Server} server
   */
  constructor (user, site, server) {
    this.site = site.toJSON()
    this.user = user.toJSON()
    this.server = server.toJSON()
    this.port = this.site.settings.port || randomNumber(49153, 65534)[0]
  }

  /**
   * Compile the deployment script for the application
   *
   * @return {string}
   */
  getDeploymentScript () {
    let userData = '#!/bin/sh'
    // first, ssh into server
    userData += sh('build/open-ssh', {
      ip: this.server.stats.networks.v4[0].ip_address,
      key: this.user.sshkey.name
    })
    // cd into the iona folder.
    userData += sh('deployments/get-into-folder')
    // cd into the specific folder for this site
    // if no site is found, then add nginx config, and add folder.
    userData += sh('deployments/get-into-site', {
      site: this.site.name,
      config: sh('configs/nginx', {
        port: this.port // TODO: get a port.
        // in future, this port will be randomly generated by the script on the server,
        // searching for an open port. i.e
        // generate random number, check if it's free, if it is, then use it
        // if it's not, then generate another one, and check if it's free again.
        // Do this till a free one is gotten.
      })
    })

    // git pull
    userData += sh('deployments/get-repo', {
      site: this.site.name,
      branch: 'master', // TODO: GET BRANCH FROM SITE CONFIGURATION
      url: this.site.settings.repo.clone_url
      // TODO: USE SSH HERE, because of private repositories.
      // so if the repo is private, when creating repo, we will have to create ssh key on server,
      // and add sshkey to github account.
    })
    // install project dependencies
    userData += sh('deployments/nodejs/install-dependencies')

    // setup environment variables
    this.site.settings.environment.forEach(env => {
      userData += sh('deployments/nodejs/setup-env', env)
    })

    // setup port environment variable
    userData += sh('deployments/nodejs/setup-env', {
      key: 'PORT',
      value: this.port
    })

    console.log(this.port)

    // start application with pm2
    userData += sh('deployments/nodejs/start', {
      site: this.site.name
    })
    // last, close ssh connection.
    userData += sh('build/close-ssh')

    return userData
  }

  /**
   * Deploy an application.
   */
  deploy () {
    return {
      deploymentProcess: exec(
        this.getDeploymentScript()
      ),
      port: this.port
    }
  }
}

module.exports = Deployment