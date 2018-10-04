'use strict'

const axios = use('axios')
const Event = use('Event')
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
    
    const user = await auth.getUser()

    user.settings = JSON.stringify({
      ...JSON.parse(user.settings),
      digitalocean: data,
    })
    await user.save()

    Event.fire('connected::digitalocean', user)

    return {
      message: 'Successfully connected.',
      user
    }
  }
}

module.exports = SocialConnectController
