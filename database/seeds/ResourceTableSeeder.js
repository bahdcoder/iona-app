'use strict'

/*
|--------------------------------------------------------------------------
| ResourceTableSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Resource = use('App/Models/Resource')

class ResourceTableSeeder {
  async run () {
    await Resource.create({
      name: 'mysql',
      slug: 'mysql',
      settings: JSON.stringify({
        instances: [{
          name: 'Add Database',
          slug: 'database',
          fields: {
            name: 'text',
            user: 'text',
            password: 'text'
          },
          validations: {
            name: 'required|string'
          }
        }, {
          slug: 'user',
          name: 'Add database user',
          fields: {
            name: 'text',
            password: 'text'
          },
          validations: {
            name: 'required|string',
            password: 'required|string'
          }
        }],
        install: {
          type: 'database',
          username: 'text',
          password: 'text',
          database: 'text'
        }
      }),
      icon: 'fas fa-database'
    })

    await Resource.create({
      name: 'postgresql',
      slug: 'postgresql',
      settings: JSON.stringify({
        instances: [{
          name: 'Add Database',
          slug: 'database',
          fields: {
            name: 'text',
            user: 'text',
            password: 'text'
          },
          validations: {
            name: 'required|string'
          }
        }, {
          name: 'Add database user',
          slug: 'user',
          fields: {
            name: 'text',
            password: 'text'
          },
          validations: {
            name: 'required|string',
            password: 'required|string'
          }
        }],
        install: {
          type: 'database',
          username: 'text',
          password: 'text',
          database: 'text'
        }
      }),
      icon: 'fas fa-database'
    })

    await Resource.create({
      name: 'mongodb',
      slug: 'mongodb',
      settings: JSON.stringify({
        instances: [{
          name: 'Add Database',
          slug: 'database',
          fields: {
            name: 'text',
            user: 'text',
            password: 'text'
          },
          validations: {
            name: 'required|string'
          }
        }, {
          name: 'Add database user',
          slug: 'user',
          fields: {
            name: 'text',
            password: 'text'
          },
          validations: {
            name: 'required|required',
            password: 'required|string'
          }
        }],
        install: {
          type: 'database',
          username: 'text',
          password: 'text',
          database: 'text'
        }
      }),
      icon: 'fas fa-database'
    })

    await Resource.create({
      name: 'redis',
      slug: 'redis',
      icon: 'fas fa-coins'
    })
  }
}

module.exports = ResourceTableSeeder
