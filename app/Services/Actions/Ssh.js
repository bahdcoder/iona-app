const { exec } = use('child_process')

class Ssh {
  /**
   * Initialize ssh requirements.
   *
   * @param {string} user
   * @param {string} host
   * @param {string} identityKey
   */
  constructor({ user, host, identityKey }) {
    this.sshUser = user
    this.host = host
    this.identityKey = identityKey
  }

  /**
   * Run a command on the remote server.
   *
   * @param {string} command commands to run on remote server
   */
  async run(commands) {
    return exec(
      `ssh -o StrictHostKeyChecking=no ${this.sshUser}@${this.host} -i ~/.ssh/${
        this.identityKey
      } ${commands}`
    )
  }

  /**
   * Run a script on the remote server.
   *
   * @param {string} script a bash script to run on remote server
   */
  async runScript(script, scriptArguments = '') {
    console.log(scriptArguments)

    return exec(
      `ssh -o StrictHostKeyChecking=no ${this.sshUser}@${this.host} -i ~/.ssh/${
        this.identityKey
      } 'bash -s' -- < ./shell-scripts/${script}.sh  ${scriptArguments}`
    )
  }
}

module.exports = Ssh
