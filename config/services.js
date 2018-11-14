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
    appDomain: Env.get('DO_APP_DOMAIN'),
    authorizeAppUrl: Env.get('DO_AUTHORIZE_APP_URL'),
    getAccessTokenUrl: Env.get('DO_GET_ACCESS_TOKEN_URL'),
    personalAccessToken: Env.get('DO_PERSONAL_ACCESS_TOKEN')
  },
  github: {
    authorizeAppUrl: Env.get('GITHUB_AUTHORIZE_APP_URL'),
    getAccessTokenUrl: Env.get('GITHUB_GET_ACCESS_TOKEN_URL')
  }
}
