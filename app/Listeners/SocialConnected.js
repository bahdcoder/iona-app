'use strict'

const Axios = use('axios')
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
