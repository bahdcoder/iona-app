'use strict'

const Schema = use('Schema')

class ResourceSchema extends Schema {
  up () {
    this.create('resources', (table) => {
      table.increments()
      /**
       * this will be the resource config.
       * For example, if its a mysql backup resource, then it should have config for AWS.
       * this config should have { client_key, client_id }
       */
      table.text('config')
      /**
       * Defines configurations for resources.
       * For example, a resource might need that information be provided, like mysql might need database name be provided to add new ones
       * Some resources might not, like redis.
       * The settings also define the fields that would need to be generated on the frontend to create the resource instance (eg mysql database)
       * The setitngs also define validation errors.
       */
      table.text('settings')
      table.text('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('resources')
  }
}

module.exports = ResourceSchema
