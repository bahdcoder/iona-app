'use strict'

const Model = use('Model')

class Deployment extends Model {
  /**
   * A deployment belogns to a site
   */
  site () {
    return this.belongsTo('App/Models/Site')
  }
}

module.exports = Deployment
