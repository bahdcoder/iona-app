'use strict'

const Site = use('App/Models/Site')
const { validateAll } = use('Validator')
const Github = use('App/Services/Api/Github')

class SiteController {
  async store({ request, response, auth, params }) {
    const body = request.all()
    const validator = await validateAll(request.all(), {
      name: 'required',
    })

    if (validator.fails()) {
      return response.status(422).send({ errors: validator.messages() })
    }

    const user = await auth.getUser()

    await Site.create({
      name,
      server_id: params.server
    })

    // const github = new Github(user)

    // const repo = await github.getSingleRepo(body.repo)

    // get the repo for this user.
    return {}
  }
}

module.exports = SiteController
