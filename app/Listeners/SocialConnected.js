'use strict'

const DigitalOcean = use('App/Services/Api/DigitalOcean')

const SocialConnected = (exports = module.exports = {})

SocialConnected.digitalocean = async user => {
  const digitalocean = new DigitalOcean(user)

  const sshkey = await user.sshkey().fetch()

  const digitaloceanKey = await digitalocean.createSshkey()

  sshkey.settings = JSON.stringify({
    ...pp(sshkey.settings),
    digitalocean: {
      id: digitaloceanKey.id,
      fingerprint: digitaloceanKey.fingerprint
    }
  })

  await sshkey.save()
}
