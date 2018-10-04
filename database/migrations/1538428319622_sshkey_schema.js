'use strict'

const Schema = use('Schema')

class SshkeySchema extends Schema {
  up () {
    this.create('sshkeys', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name')
      table.text('public_key')
      table.text('settings')
      table.timestamps()
    })
  }

  down () {
    this.drop('sshkeys')
  }
}

module.exports = SshkeySchema
