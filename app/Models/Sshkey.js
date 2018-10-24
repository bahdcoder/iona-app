'use strict'

const Model = use('Model')

class Sshkey extends Model {
  /**
   * An ssh key belongs to a user.
   */
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Sshkey
