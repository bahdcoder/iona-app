'use strict'

const Schema = use('Schema')

class SiteSchema extends Schema {
  up() {
    this.create('sites', table => {
      table.increments()
      table
        .integer('server_id')
        .unsigned()
        .references('id')
        .inTable('servers')
      table.string('name')
      table.string('provider')
      table.string('repository')
      table.string('type')
      table.text('settings')
      table.timestamps()
    })
  }

  down() {
    this.drop('sites')
  }
}

module.exports = SiteSchema
