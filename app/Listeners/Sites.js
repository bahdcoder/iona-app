'use strict'

const Config = use('Config')
const DigitalOcean = use('App/Services/Api/DigitalOcean')
const siteNameGenerate = require('project-name-generator')
const CreateSiteAction = use('App/Services/Actions/CreateSite')

const Sites = (exports = module.exports = {})

Sites.created = async ({ server, site, user }) => {
  // make an api request to digital ocean
  const appDomain = Config.get('services.digitalocean.appDomain')

  const digitalocean = new DigitalOcean(
    null,
    Config.get('services.digitalocean.personalAccessToken')
  )

  // generate subdomain name
  const name = siteNameGenerate({ number: true }).dashed
  const ip = server.toJSON().stats.networks.v4[0].ip_address
  // add subdomain route for this new site.
  await digitalocean.addSubdomainRecord({ name, ip })

  site.settings = ss({
    ...pp(site.settings),
    ionaSubdomainName: `${name}.${appDomain}`,
    created: false
  })

  await site.save()

  // this is where we ssh into the server to create the new site
  const { createSiteProcess, port } = await new CreateSiteAction({
    user: user.toJSON(),
    site: site.toJSON(),
    server: server.toJSON()
  }).setup()

  createSiteProcess.stderr.on('data', buffer => {
    console.log('ERROR: ---------------->', buffer.toString())
  })

  createSiteProcess.stdout.on('data', buffer => {
    console.log('---------------->', buffer.toString())
  })

  createSiteProcess.stdout.on('close', async () => {
    site.settings = ss({
      ...pp(site.settings),
      port,
      created: true
    })

    await site.save()
  })
}
