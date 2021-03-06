'use strict'

const axios = use('axios')
const Event = use('Event')
const Config = use('Config')
const { parse } = use('query-string')

class SocialConnectController {
  /**
   * Connect to digital ocean.
   *
   * @param {Object} context.request
   */
  async digitalocean({ response }) {
    return response.redirect(
      Config.get('services.digitalocean.authorizeAppUrl')
    )
  }

  async github({ response }) {
    return response.redirect(Config.get('services.github.authorizeAppUrl'))
  }

  /**
   * Handle the callback from digital ocean.
   *
   * @param {Object} context.request
   */
  async digitaloceanCallback({ request, auth }) {
    const { code } = request.all()
    const { getAccessTokenUrl } = Config.get('services.digitalocean')

    const { data } = await axios.post(`${getAccessTokenUrl}&code=${code}`)

    const user = await auth.getUser()

    user.settings = ss({
      ...pp(user.settings),
      digitalocean: data
    })
    await user.save()

    Event.fire('connected::digitalocean', user)

    return {
      message: 'Successfully connected.',
      user
    }
  }

  async githubCallback({ request, auth }) {
    const { code } = request.all()
    const { getAccessTokenUrl } = Config.get('services.github')

    const { data } = await axios.post(`${getAccessTokenUrl}&code=${code}`)

    const user = await auth.getUser()

    user.settings = ss({
      ...pp(user.settings),
      github: parse(data)
    })
    await user.save()

    return {
      message: 'Successfully connected github.',
      user
    }
  }
}

module.exports = SocialConnectController
