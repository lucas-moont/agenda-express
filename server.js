require('dotenv').config()

const express = require("express");
let app = express();
const path = require("path");
let routes = require("./routes");
let { globalMiddleware } = require("./src/middlewares/middleware");
let {csrfToken, checkCsrfError} = require("./src/middlewares/csurf_middleware")
//MODELA A NOSSA BASE DE DADOS
const mongoose = require("mongoose");
//O MONGOOSE RETORNA UMA PROMESSA, NO CÓDIGO ABAIXO, ESTAMOS AGUARDANDO A RESPOSTA
//DESSA PROMESSA PARA EMITIR UM SINAL DE CONNECTED
mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
  console.log("Conectei à base");
  app.emit("Connected");
}).catch(e => {
  console.log(e)
});
let helmet = require('helmet') //recomendação do próprio express para deixar a app mais segura

//Section deve ser importado após conexão com a base de dados
const session = require('express-session')
const MongoStore = require('connect-mongo') //SALVA AS SESSÕES NA BASE DE DADOS
const flash = require('connect-flash');
const csurf = require('csurf');

app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: 'queroComerAquelaBiancaAnchietaSafadaGostosa',
  store: new MongoStore({ 
    mongooseConnction: mongoose.connection,
    mongoUrl: process.env.CONNECTIONSTRING 
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})

//COMO VAMOS USAR AS SESSIONS E AS FLASHMESSAGES NAS PÁGINAS
//PRECISAMOS USAR ELAS ANTES DOS MIDDLEWARES DE ROTAS ETC.
app.use(sessionOptions)
app.use(flash())

//MIDDLEWARES
app.use(csurf())
app.use(checkCsrfError)
app.use(csrfToken);
app.use(routes);

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.on("Connected", () => {
  app.listen(3000, () => {
    console.log("Server running at port 3000");
  });
});
/*
app.use((req, res, next) => {
  res.status(404).render('404', {
    titulo: 'Errrrrrrou'
  })
})*/