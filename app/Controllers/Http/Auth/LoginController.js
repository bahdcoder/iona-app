'use strict'

const User = use('App/Models/User')

/**
 * The login controller.
 */
class LoginController {
  /**
   * Generate a jwt for a user.
   *
   * @param {Object} context.auth
   * @param {Object} context.request
   */
  async auth({ auth, request, response }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)
    const user = await User.find({ email })

    return { user, token }
  }
}

module.exports = LoginController
