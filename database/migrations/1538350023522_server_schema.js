'use strict'

const Schema = use('Schema')

class ServerSchema extends Schema {
  up () {
    this.create('servers', (table) => {
      table.increments()
      table.string('name')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.text('settings')
      table.text('stats')
      table.timestamps()
    })
  }

  down () {
    this.drop('servers')
  }
}

module.exports = ServerSchema
