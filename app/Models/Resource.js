'use strict'

const Model = use('Model')

class Resource extends Model {
  servers () {
    return this.belongsToMany('App/Models/Server').withTimestamps()
  }
}

module.exports = Resource