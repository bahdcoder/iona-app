'use strict'

const Event = use('Event')
const User = use('App/Models/User')
const { validateAll } = use('Validator')

class RegisterController {
  /**
   * Store a new user.
   *
   *
   * @param context.request request
   */
  async store ({ auth, request, response }) {
    const rules = {
      name: 'required',
      email: 'required|email|unique:users,email',
      password: 'required|confirmed'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response.status(422).send(validation.messages())
    }

    const user = await User.create(
      request.only(['name', 'email', 'password'])
    )

    const token = await auth.generate(user)

    Event.fire('registered::user', user)

    response.send({ user, token })
  }
}

module.exports = RegisterController
