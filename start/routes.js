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

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.group(() => {
  Route.post('login', 'LoginController.auth')
  Route.post('register', 'RegisterController.create')
}).prefix('auth').namespace('Auth')

Route.on('*').render('main')
