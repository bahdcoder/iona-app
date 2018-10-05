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

const Factory = use('Factory')
const Resource = use('App/Models/Resource')

class ResourceTableSeeder {
  async run () {
    await Resource.create({
      name: 'mysql',
      settings: JSON.stringify({
        database: {
          name: 'Add Database',
          fields: {
            name: 'text',
            user: 'text',
            password: 'text',
          },
          validations: {
            name: 'required|string'
          }
        },
        user: {
          name: 'Add database user',
          fields: {
            name: 'text',
            password: 'text',
          },
          validations: {
            name: 'required|required',
            password: 'required|string'
          }
        }
      })
    })

    await Resource.create({
      name: 'postgresql',
      settings: JSON.stringify({
        database: {
          name: 'Add Database',
          fields: {
            name: 'text',
            user: 'text',
            password: 'text',
          },
          validations: {
            name: 'required|string'
          }
        },
        user: {
          name: 'Add database user',
          fields: {
            name: 'text',
            password: 'text',
          },
          validations: {
            name: 'required|required',
            password: 'required|string'
          }
        }
      })
    })

    await Resource.create({
      name: 'mongodb',
      settings: JSON.stringify({
        database: {
          name: 'Add Database',
          fields: {
            name: 'text',
            user: 'text',
            password: 'text',
          },
          validations: {
            name: 'required|string'
          }
        },
        user: {
          name: 'Add database user',
          fields: {
            name: 'text',
            password: 'text',
          },
          validations: {
            name: 'required|required',
            password: 'required|string'
          }
        }
      })
    })

    await Resource.create({
      name: 'redis',
    })
  }
}

module.exports = ResourceTableSeeder
