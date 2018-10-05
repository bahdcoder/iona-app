'use strict'

const Axios = use('axios')
const Redis = use('Redis')

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
  async createServer({ name, region, size }) {
    const { data } = await this.http.post('/droplets', {
      name, region, size,
      image: 'ubuntu-18-04-x64',
      ssh_keys: [await this.getSshkeyFingerprint()]
    })

    return data.droplet
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
}

module.exports = DigitalOcean
