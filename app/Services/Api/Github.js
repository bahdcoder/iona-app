'use strict'

const Axios = use('axios')

class Github {
  /**
   * Set the user to be used for authenticated requests.
   * @param {Object} user 
   */
  constructor(user) {
    /**
     * Set the url connection.
     */
    this.url = 'https://api.github.com'

    /**
     * The authenticated user.
     */
    this.user = user

    /**
     * Set the user settings.
     */
    this.settings = JSON.parse(this.user.settings)

    /**
     * The axios instance.
     */
    this.http = Axios.create({
      baseURL: this.url,
      headers: {
        Authorization: `token ${this.settings.github.access_token}`,
        'Content-Type': 'application/json',
      }
    })
  }

  /**
   * Get a single repository for a user
   *
   * @return {string}
   */
  async getSingleRepo(link) {
    const { data } = await this.http.get(`/repos/${link}`)

    return data
  }
}

module.exports = Github
