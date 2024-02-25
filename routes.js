const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contactController = require('./src/controllers/contactController')
const {loginRequired} = require('./src/middlewares/middleware')


//ROTA DA HOME
route.get('/', loginRequired ,homeController.index)

//ROTA DO LOGIN
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//rotas de contato
route.get('/contato', loginRequired, contactController.index)
route.post('/contato/register', loginRequired, contactController.register)
route.get('/contato/:id', loginRequired, contactController.editIndex)

module.exports = route;