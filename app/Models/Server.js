'use strict'

const Model = use('Model')

class Server extends Model {
  resources () {
    return this.belongsToMany('App/Models/Resource').withTimestamps()
  }
}

module.exports = Server
