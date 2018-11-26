'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  /**
   * Set the fields to be excluded from database queries.
   */
  static get hidden() {
    return ['password', 'settings']
  }

  /**
   * Define all computed properties.
   */
  static get computed() {
    return ['config']
  }

  /**
   * Get the user config settings.
   * @param {Object} user.settings
   */
  getConfig({ settings }) {
    if (!settings) {
      settings = {}
    }
    const { digitalocean, github } = settings

    return {
      digitalocean: digitalocean && digitalocean.access_token ? true : false,
      github: github && github.access_token ? true : false
    }
  }

  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * Getters for transforming user settings
   *
   * @param {string} settings json string of settings.
   *
   * @return {Object} the object form of json settings.
   */
  getSettings(settings) {
    return JSON.parse(settings)
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  /**
   * A user has one ssh key
   */
  sshkey() {
    return this.hasOne('App/Models/Sshkey')
  }

  /**
   * A user has many servers
   *
   * @method servers
   *
   * @return {Object}
   */
  servers() {
    return this.hasMany('App/Models/Server')
  }
}

module.exports = User
