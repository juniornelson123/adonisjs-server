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
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sign_in', 'SessionController.create')
Route.post("properties/:id/images", "ImageController.store" ).middleware("auth")
Route.resource('/properties', 'PropertyController').apiOnly().middleware('auth')
