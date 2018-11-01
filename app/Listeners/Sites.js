'use strict'

const Config = use('Config')
const DigitalOcean = use('App/Services/Api/DigitalOcean')

const Sites = exports = module.exports = {}

Sites.created = async ({ server, site }) => {
  // make an api request to digital ocean
  const appDomain = Config.get('services.digitalocean.appDomain')

  const digitalocean = (new DigitalOcean(null, Config.get('services.digitalocean.personalAccessToken')))

  // generate subdomain name
  const name = `iona-${site.id}`
  const ip = server.toJSON().stats.networks.v4[0].ip_address
  // add subdomain route for this new site.
  await digitalocean.addSubdomainRecord({ name, ip })

  site.settings = ss({
    ...pp(site.settings),
    ionaSubdomainName: `${name}.${appDomain}`
  })

  await site.save()
}
