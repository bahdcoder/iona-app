'use strict'

const Model = use('Model')

class ResourceServer extends Model {
  static get table () {
    return 'resource_server'
  }
}

module.exports = ResourceServer
