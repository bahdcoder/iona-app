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
  const Sshkey = use('App/Models/Sshkey')
  const u = await Sshkey.all()

  return response.send(u)
})

Route.group(() => {
  Route.get('/droplets/sizes', 'DropletController.getSizesAndRegions').middleware(['auth'])
}).namespace('Servers')

Route.on('*').render('main')
