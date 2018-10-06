'use strict'

const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Digital ocean config
  |--------------------------------------------------------------------------
  |
  | This is the configuration for redirecting to digital ocean to get user
  | authorisation.
  */
  digitalocean: {
    url: Env.get('DO_OAUTH2_URL'),
    clientId: Env.get('DO_IONA_CLIENT_ID'),
    clientSecret: Env.get('DO_IONA_CLIENT_SECRET'),
    apiUrl: Env.get('DO_API_URL'),
    redirectUri: Env.get('DO_IONA_REDIRECT_URI')
  },
  github: {
    url: Env.get('GITHUB_OAUTH2_URL'),
    clientId: Env.get('GITHUB_CLIENT_ID'),
    redirectUrl: Env.get('GITHUB_REDIRECT_URI'),
    clientSecret: Env.get('GITHUB_CLIENT_SECRET'),
    apiUrl: Env.get('GITHUB_API_URL')
  }
}
