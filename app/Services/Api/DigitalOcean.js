'use strict'

const Axios = use('axios')
const Redis = use('Redis')
const { generate } = use('generate-password')

/**
 * The connector for digital ocean.
 */
class DigitalOcean {
  constructor (user) {
    /**
     * Set the url connection.
     */
    this.url = 'https://api.digitalocean.com/v2'

    /**
     * The authenticated user.
     */
    this.user = user

    this.settings = pp(this.user.settings)
    /**
     * The axios instance.
     */
    this.http = Axios.create({
      baseURL: this.url,
      headers: {
        Authorization: `Bearer ${this.settings.digitalocean.access_token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * Get the digital ocean regions.
   */
  async getRegions () {
    let regions = await Redis.get('digitalocean-regions')

    if (regions) {
      return pp(regions)
    }

    const { data } = await this.http.get('/regions')

    regions = data.regions

    await Redis.set('digitalocean-regions', ss(regions))

    return regions
  }

  /**
   * Get the digital ocean sizes.
   */
  async getSizes () {
    let sizes = await Redis.get('digitalocean-sizes')

    if (sizes) {
      return pp(sizes)
    }

    const { data } = await this.http.get('/sizes')

    sizes = data.sizes

    await Redis.set('digitalocean-sizes', ss(sizes))

    return sizes
  }

  /**
 * Create a server
 */
  async createServer ({ name, region, size }, resources = []) {
    const { userData, resourceSettings, resourceInstanceSettings } = await this.generateUserData(resources)

    const { data } = await this.http.post('/droplets', {
      name,
      region,
      size,
      image: 'ubuntu-18-04-x64',
      ssh_keys: [await this.getSshkeyFingerprint()],
      user_data: userData
    })

    return { droplet: data.droplet, resourceSettings, resourceInstanceSettings }
  }

  /**
   * Get the fingerprint for current user's sshkey
   */
  async getSshkeyFingerprint () {
    const { settings } = await this.user.sshkey().fetch()

    return pp(settings).digitalocean.fingerprint
  }

  /**
   * Create an ssh key on digital ocean account of user.
   *
   * @return {Object} newly created api key
   */
  async createSshkey () {
    const sshkey = await this.user.sshkey().fetch()

    const { data } = await this.http.post('/account/keys', {
      name: sshkey.name,
      public_key: sshkey.public_key
    })

    return data.ssh_key
  }

  /**
   * Get a single droplet
   *
   * @return {Object} droplet
   */
  async getDroplet (id) {
    const { data } = await this.http.get(`/droplets/${id}`)

    return data.droplet
  }

  /**
   * Generate the user data to be sent to digital ocean server.
   */
  async generateUserData (resources) {
    let userData = '#!/bin/sh'
    let resourceSettings = {}
    let resourceInstanceSettings = {}

    // install nginx
    userData += sh('server/nginx')

    // install node-js stable
    userData += sh('server/nodejs')

    // install git
    userData += sh('server/git')

    resources.forEach(resource => {
      resourceSettings[resource.slug] = {}
      resourceInstanceSettings[resource.slug] = {}
      let resourceNewSettings = {}
      if (resource.settings) {
        const settings = resource.settings

        if (settings.install) {
          resourceInstanceSettings[resource.slug][settings.install.type] = []
          for (const setting in settings.install) {
            if (settings.install.hasOwnProperty(setting)) {
              if (setting !== 'type') {
                resourceNewSettings[setting] = generate({ length: 16 })
              }
            }
          }
          resourceInstanceSettings[resource.slug][settings.install.type].push(resourceNewSettings)
        }
      }

      resourceSettings[resource.slug] = resourceNewSettings

      userData += sh(`resources/${resource.slug}/install`, resourceNewSettings)
    })

    return { userData, resourceSettings, resourceInstanceSettings }
  }
}

module.exports = DigitalOcean
