'use strict'

const Schema = use('Schema')

class DeploymentSchema extends Schema {
  up () {
    this.create('deployments', (table) => {
      table.increments()
      table.integer('site_id').unsigned().references('id').inTable('sites')
      table.text('log')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('deployments')
  }
}

module.exports = DeploymentSchema
