'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route.post('login', 'LoginController.auth')
  Route.post('register', 'RegisterController.store')

  Route.get('digitalocean', 'SocialConnectController.digitalocean')
  Route
    .post('digitalocean/callback', 'SocialConnectController.digitaloceanCallback')
    .middleware(['auth'])

}).prefix('auth').namespace('Auth')

Route.get('/users', async ({ response }) => {
  const Resource = use('App/Models/Resource')
  const Server = use('App/Models/Server')
  const u = await Resource.all(1)
  // const s = await (await Server.find(1)).resources().fetch()

  // await s.resources().attach([u.id])

  return response.send({ u })
})

Route.group(() => {
  Route.get('/droplets/sizes', 'DropletController.getSizesAndRegions')

  Route.resource('droplets', 'DropletController')
}).namespace('Servers').middleware(['auth'])

Route.resource('resources', 'ResourceController').middleware(['auth'])

Route.on('*').render('main')
