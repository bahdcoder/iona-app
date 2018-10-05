'use strict'

const Schema = use('Schema')

class ResourceServerSchema extends Schema {
  up () {
    this.create('resource_server', (table) => {
      table.increments()
      table.integer('server_id').unsigned().references('id').inTable('servers')
      // represents the list of created resources on this resource. for example, for mysql, 3 mysql databases created.
      table.text('settings')
      table.integer('resource_id').unsigned().references('id').inTable('resources')
      table.timestamps()
    })
  }

  down () {
    this.drop('resource_server')
  }
}

module.exports = ResourceServerSchema
