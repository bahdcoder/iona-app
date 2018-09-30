'use strict'

const Schema = use('Schema')

class ServerSchema extends Schema {
  up () {
    this.create('servers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('servers')
  }
}

module.exports = ServerSchema
