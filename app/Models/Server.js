'use strict'

const Model = use('Model')

class Server extends Model {
  resources() {
    return this.belongsToMany('App/Models/Resource')
      .withTimestamps()
      .withPivot(['settings'])
      .pivotModel('App/Models/ResourceServer')
  }

  getStats(stats) {
    return pp(stats)
  }

  sites() {
    return this.hasMany('App/Models/Site')
  }
}

module.exports = Server
