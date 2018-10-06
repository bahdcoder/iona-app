'use strict'

const fs = use('fs')
const path = use('path')
const Axios = use('axios')
const Redis = use('Redis')
const Helpers = use('Helpers')
const Mustache = use('mustache')
const { generate } = use('generate-password')

/**
 * The connector for digital ocean.
 */
class DigitalOcean {

  constructor(user) {
    /**
     * Set the url connection.
     */
    this.url = 'https://api.digitalocean.com/v2'

    /**
     * The authenticated user.
     */
    this.user = user

    this.settings = JSON.parse(this.user.settings)
    /**
     * The axios instance.
     */
    this.http = Axios.create({
      baseURL: this.url,
      headers: {
        Authorization: `Bearer ${this.settings.digitalocean.access_token}`,
        'Content-Type': 'application/json',
      }
    })
  }

  /**
   * Get the digital ocean regions.
   */
  async getRegions() {
    let regions = await Redis.get('digitalocean-regions')

    if (regions) {
      return JSON.parse(regions)
    }

    const { data } = await this.http.get('/regions')

    regions = data.regions

    await Redis.set('digitalocean-regions', JSON.stringify(regions))

    return regions
  }

  /**
   * Get the digital ocean sizes.
   */
  async getSizes() {
    let sizes = await Redis.get('digitalocean-sizes')

    if (sizes) {
      return JSON.parse(sizes)
    }

    const { data } = await this.http.get('/sizes')

    sizes = data.sizes

    await Redis.set('digitalocean-sizes', JSON.stringify(sizes))

    return sizes
  }

  /**
 * Create a server
 */
  async createServer({ name, region, size }, resources = []) {
    const { userData, resourceSettings } = await this.generateUserData(resources)

    // console.log(userData)

    // return {}

    const { data } = await this.http.post('/droplets', {
      name, region, size,
      image: 'ubuntu-18-04-x64',
      ssh_keys: [await this.getSshkeyFingerprint()],
      user_data: userData,
    })

    return { droplet: data.droplet, resourceSettings }
  }

  /**
   * Get the fingerprint for current user's sshkey
   */
  async getSshkeyFingerprint() {
    const { settings } = await this.user.sshkey().fetch()

    return JSON.parse(settings).digitalocean.fingerprint
  }


  /**
   * Create an ssh key on digital ocean account of user.
   * 
   * @return {Object} newly created api key
   */
  async createSshkey() {
    const sshkey = await this.user.sshkey().fetch()

    const { data } = await this.http.post('/account/keys', {
      name: sshkey.name,
      public_key: sshkey.public_key,
    })

    return data.ssh_key
  }

    /**
   * Get a single droplet
   * 
   * @return {Object} droplet
   */
  async getDroplet(id) {
    const { data } = await this.http.get(`/droplets/${id}`)

    return data.droplet
  }

  /**
   * Generate the user data to be sent to digital ocean server.
   */
  async generateUserData(resources) {
    let userData = '#!/bin/sh'
    let resourceSettings = {}

    // install nginx
    userData += Mustache.render(Helpers.getScript('server/nginx'))

    // install node-js stable
    userData += Mustache.render(Helpers.getScript('server/nodejs'))

    // install git
    userData += Mustache.render(Helpers.getScript('server/git'))

    resources.forEach(resource => {
      resourceSettings[resource.slug] = {}
      let resourceNewSettings = {}
      if (resource.settings) {
        const settings = JSON.parse(resource.settings)

        if (settings.new) {
          for (const setting in settings.new) {
            if (settings.new.hasOwnProperty(setting)) {
              resourceNewSettings[setting] = generate({ length: 32 })
            }
          }
        }
      }

      resourceSettings[resource.slug] = resourceNewSettings
      
      userData += Mustache.render(Helpers.getScript(`resources/${resource.slug}`), resourceNewSettings)
    })

    return { userData, resourceSettings }
  }
}

module.exports = DigitalOcean
