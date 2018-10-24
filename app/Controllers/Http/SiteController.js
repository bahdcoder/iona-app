'use strict'

const Site = use('App/Models/Site')
const Server = use('App/Models/Server')
const { validateAll } = use('Validator')
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
      type: 'required|in:nodejs,laravel,static'
    })

    if (validator.fails()) {
      return response.status(422).send({ errors: validator.messages() })
    }

    // get server
    const server = await Server.findOrFail(params.server)

    // create a new site
    const site = await Site.create({
      name: body.name,
      type: body.type,
      server_id: server.id,
      provider: body.provider || 'github'
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
    const site = await Site.findOrFail(params.id)

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
}

module.exports = SiteController
