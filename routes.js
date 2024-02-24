const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')

//ROTA DA HOME
route.get('/', homeController.index)

//ROTA DO LOGIN
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
module.exports = route;