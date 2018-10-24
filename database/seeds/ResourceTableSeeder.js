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
        }],
        install: {
          type: 'database',
          name: 'text',
          user: 'text',
          password: 'text'
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
        }],
        install: {
          type: 'database',
          name: 'text',
          user: 'text',
          password: 'text'
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
        }],
        install: {
          type: 'database',
          name: 'text',
          user: 'text',
          password: 'text'
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
