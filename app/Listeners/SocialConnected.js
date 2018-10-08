'use strict'

const Axios = use('axios')
const Github = use('App/Services/Api/Github')
const DigitalOcean = use('App/Services/Api/DigitalOcean')

const SocialConnected = exports = module.exports = {}

SocialConnected.digitalocean = async user => {

  const digitalocean = new DigitalOcean(user)

  const sshkey = await user.sshkey().fetch()

  const digitalocean_key = await digitalocean.createSshkey()

  sshkey.settings = JSON.stringify({
    ...JSON.parse(sshkey.settings),
    digitalocean: {
      id: digitalocean_key.id,
      fingerprint: digitalocean_key.fingerprint,
    },
  })

  await sshkey.save()
}
