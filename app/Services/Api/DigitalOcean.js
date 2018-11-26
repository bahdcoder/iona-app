'use strict'

const Axios = use('axios')
const Redis = use('Redis')
const Config = use('Config')
const { generate } = use('generate-password')

/**
 * The connector for digital ocean.
 */
class DigitalOcean {
  constructor (user, personalAccessToken) {
    /**
     * Set the url connection.
     */
    this.url = 'https://api.digitalocean.com/v2'

    /**
     * Set the url personal access token.
     */
    this.personalAccessToken = personalAccessToken

    /**
     * The authenticated user.
     */
    this.user = user

    /**
     * Set settings if personal access token was not provided
     */
    if (!this.personalAccessToken && this.user) {
      this.settings = pp(this.user.settings)
    }

    /**
     * Set the application domain.
     * This will be used to automatically configure subdomains for routes.
     */
    this.appDomain = Config.get('services.digitalocean.appDomain')

    /**
     * The axios instance.
     */
    this.http = Axios.create({
      baseURL: this.url,
      headers: {
        Authorization: `Bearer ${this.personalAccessToken ? this.personalAccessToken : this.settings.digitalocean.access_token}`,
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
  async createServer ({ name, region, size, database }) {
    const { userData, databaseSettings } = await this.generateUserData(database)

    const { data } = await this.http.post('/droplets', {
      name,
      region,
      size,
      image: 'ubuntu-18-04-x64',
      ssh_keys: [await this.getSshkeyFingerprint()],
      user_data: userData
    })

    return { droplet: data.droplet, databaseSettings }
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
  async generateUserData (database) {
    let userData = '#!/bin/sh'
    let databaseSettings = {}

    // install nginx
    userData += sh('server/user-data')

    // install database
    // if a database was selected, then load the install script for this database.
    if (database) {
      switch (database) {
        case 'mysql':
          databaseSettings = {
            username: 'iona',
            database: generate({ length: 32 }),
            password: generate({ length: 32 })
          }
          userData += sh(`resources/${database}/install`, databaseSettings)
          break
        case 'postgresql':
          databaseSettings = {
            username: 'iona',
            database: generate({ length: 32 }),
            password: generate({ length: 32 })
          }
          userData += sh(`resources/${database}/install`, databaseSettings)
          break
        default:
          break
      }
    }

    console.log(userData)

    return { userData, databaseSettings }
  }

  /**
   * Add a subdomain record for a newly created site
   * @param {string} name
   */
  async addSubdomainRecord ({ name, ip }) {
    const { data } = await this.http.post(`/domains/${this.appDomain}/records`, {
      name,
      type: 'A',
      data: ip,
      ttl: 1
    })

    return data
  }
}

module.exports = DigitalOcean
