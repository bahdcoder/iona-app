'use strict'

class DeploymentController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = DeploymentController
