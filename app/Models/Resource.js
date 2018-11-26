'use strict'

const Model = use('Model')

class Resource extends Model {
  /**
   * The resource belongs to many servers
   *
   * @return {Object}
   */
  servers() {
    return this.belongsToMany('App/Models/Server')
      .withTimestamps()
      .withPivot(['settings'])
      .pivotModel('App/Models/ResourceServer')
  }

  /**
   * Convert json settings to object
   *
   * @param {string} settings
   */
  getSettings(settings) {
    return pp(settings)
  }
}

module.exports = Resource
