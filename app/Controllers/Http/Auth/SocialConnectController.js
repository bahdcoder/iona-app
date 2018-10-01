'use strict'

const axios = use('axios')
const Config = use('Config')

class SocialConnectController {
  /**
   * Connect to digital ocean.
   * 
   * @param {Object} context.request
   */
  async digitalocean({ response }) {
    return response.redirect(Config.get('services.digitalocean.url'))
  }

  /**
   * Handle the callback from digital ocean.
   * 
   * @param {Object} context.request 
   */
  async digitaloceanCallback({ request, auth }) {
    const { code } = request.all()
    const {
      apiUrl,
      clientId,
      redirectUri,
      clientSecret,
    } = Config.get('services.digitalocean')

    const { data } = await axios.post(`${apiUrl}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`)
    
    const { user } = auth

    user.settings = {
      ...user.settings,
      digitalocean: data
    }

    await user.save()

    return {
      message: 'Successfully connected.',
      user
    }
  }
}

module.exports = SocialConnectController
