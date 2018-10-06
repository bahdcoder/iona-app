const fs = require('fs')
const { ServiceProvider } = require('@adonisjs/fold')

class IonaServiceProvider extends ServiceProvider {
  register () {
    // register bindings
  }

  boot () {
    // optionally do some intial setup
    const Helpers = this.app.use('Helpers')

    /**
     * A helper to get the scripts path.
     */
    Helpers.scriptsPath = () => `${Helpers.appRoot()}/scripts`

    /**
     * A helper to get a script content.
     * @param {string} script
     */
    Helpers.getScript = script => fs.readFileSync(`${Helpers.scriptsPath()}/${script}.mustache`).toString()
  }
}

module.exports = IonaServiceProvider
