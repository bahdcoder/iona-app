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
}

module.exports = Site
