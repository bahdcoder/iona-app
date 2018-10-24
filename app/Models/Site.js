'use strict'

const Model = use('Model')

class Site extends Model {
  /**
   * A site has many deployments.
   *
   * @return {Object}
   */
  deployments () {
    return this.hasMany('App/Models/Deployment')
  }

  /**
   * Parse the json string settings to an object
   * @param {JSON} settings site settings
   */
  getSettings (settings) {
    return pp(settings)
  }
}

module.exports = Site
