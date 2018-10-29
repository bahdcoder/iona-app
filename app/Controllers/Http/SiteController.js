'use strict'

const Site = use('App/Models/Site')
const Server = use('App/Models/Server')
const { validateAll } = use('Validator')
const { generate } = use('generate-password')
const Github = use('App/Services/Api/Github')

class SiteController {
  async index ({ params }) {
    const server = await Server.findOrFail(params.server)

    const sites = await server.sites().fetch()

    return sites
  }

  /**
   * Store a new site on server for this user.
   *
   * @param {Object} context.request
   */
  async store ({ request, response, auth, params }) {
    // validate the data
    const body = request.all()
    const validator = await validateAll(body, {
      name: 'required|unique:sites',
      type: 'required|in:nodejs,laravel,static,adonisjs'
    })

    if (validator.fails()) {
      return response.status(422).send({ errors: validator.messages() })
    }

    // get server
    const server = await Server.query().where({
      id: params.server
    }).with('resources').firstOrFail()

    const { defaultEnvs } = pp(server.settings)

    const environment = [
      ...defaultEnvs, {
        key: 'NODE_ENV',
        value: 'production'
      }]

    switch (body.type) {
      case 'adonisjs':
        environment.push({
          key: 'APP_KEY',
          value: generate({ length: 32 })
        })
        environment.push({
          key: 'APP_URL',
          value: `http://${body.name}`
        })
        environment.push({
          key: 'SESSION_DRIVER',
          value: 'cookie'
        })
        environment.push({
          key: 'HASH_DRIVER',
          value: 'bcrypt'
        })
        environment.push({
          key: 'CACHE_VIEWS',
          value: true
        })
        environment.push({
          key: 'DB_CONNECTION',
          value: 'mysql'
        })
        environment.push({
          key: 'DB_HOST',
          value: '127.0.0.1'
        })
        environment.push({
          key: 'DB_PORT',
          value: 3306
        })
        environment.push({
          key: 'IONA_PRE_START',
          value: 'node ace migration:run --force'
        })
        environment.push({
          key: 'ENV_SILENT',
          value: true
        })
        break
      case 'nodejs':
        // environment.push({
        //   key: '',
        //   value: ''
        // })
        break
      default:
        break
    }

    // create a new site
    const site = await Site.create({
      name: body.name,
      type: body.type,
      server_id: server.id,
      provider: body.provider || 'github',
      settings: ss({
        environment,
        type: body.type
      })
    })

    // command to check if a PORT is free: lsof -i :{PORT}
    // if there is output, then that port is occupied.

    return site
  }

  /**
   * Get a single site
   *
   * @param {Object} context.params
   */
  async show ({ params }) {
    const site = await Site.query().where({
      id: params.id
    }).with('server').firstOrFail()

    return site
  }

  /**
   * Store a new site on server for this user.
   *
   * @param {Object} context.request
   */
  async addRepo ({ request, response, auth, params }) {
    const body = request.all()

    const user = await auth.getUser()

    const validator = await validateAll(body, {
      provider: 'required|in:github',
      repo: 'required|string'
    })

    const site = await Site.findOrFail(params.site)

    if (validator.fails()) {
      return response.status(422).json({ errors: validator.messages() })
    }

    const repo = await (new Github(user)).getRepo(body.repo)

    site.settings = ss({
      ...pp(site.settings),
      repo,
      deployBranch: 'master'
    })

    site.repository = body.repo

    await site.save()

    return site
  }

  /**
   * Add environment variable
   *
   * @param {Object} request the request
   */
  async addEnvVariable ({ request, response, auth, params }) {
    const body = request.all()

    const validator = await validateAll(body, {
      key: 'required|string',
      value: 'required|string'
    })

    if (validator.fails()) {
      return response.status(422).json({
        errors: validator.messages()
      })
    }

    const site = await Site.findOrFail(params.site)

    const environment = [
      ...pp(site.settings).environment
    ]

    if (environment.find(env => env.key === body.key)) {
      return response.status(422).json({
        message: 'Environment variable already exists.'
      })
    }

    environment.push({
      key: body.key,
      value: body.value
    })

    site.settings = ss({
      ...pp(site.settings),
      environment
    })

    await site.save()

    return site
  }

  /**
   * Delete environment variable
   *
   * @param {Object} request the request
   */
  async deleteEnvVariable ({ request, response, params }) {
    const validator = await validateAll(params, {
      key: 'required|string'
    })

    if (validator.fails()) {
      return response.status(422).json({
        errors: validator.messages()
      })
    }

    const site = await Site.query().where({
      id: params.site
    }).with('server').firstOrFail()

    const environment = [
      ...pp(site.settings).environment
    ].filter(variable => variable.key !== params.key)

    site.settings = ss({
      ...pp(site.settings),
      environment
    })

    await site.save()

    return site
  }
}

module.exports = SiteController
