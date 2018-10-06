'use strict'

const Model = use('Model')

class Server extends Model {
  resources () {
    return this.belongsToMany('App/Models/Resource').withTimestamps().pivotModel('App/Models/ResourceServer')
  }
}

module.exports = Server
