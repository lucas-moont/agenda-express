import 'core-js/stable'
import 'regenerator-runtime/runtime'

import './assets/css/style.css'

import ValidadorDeLogin from './assets/scripts/validaForm'

let validaRegistro = new ValidadorDeLogin('.formRegistro')
validaRegistro.init()