'use strict'

const Model = use('Model')

class ResourceServer extends Model {
  /**
   * Get the table for this pivot.
   */
  static get table () {
    return 'resource_server'
  }

  /**
   * Convert settings to json object
   *
   * @param {string} settings
   */
  getSettings (settings) {
    return pp(settings)
  }
}

module.exports = ResourceServer
