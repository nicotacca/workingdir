
const express = require('express')
const morgan = require('morgan')
// version 3.0 de handle ojo
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const { database } = require('./keys')
const passport = require('passport')

// Inicializaciones
const app = express()
require('./lib/passport')

// Settings
app.set('port', process.env.PORT || 3500)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    //defaultLayout: 'main',
    defaultLayout: 'main2',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  }))

app.set('view engine', '.hbs')

// MIDDLEWARES : funciones q se ejecutan cada vez que hay peticiones
app.use(session({
  secret: 'taccasession',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())


// Variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash('success')
  app.locals.message = req.flash('message')
  app.locals.user = req.user
  next();
})

// Routes (del tuto)

app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// Routes (para practicar)
app.use('/intrav1', require('./routes/opis_consulta'));

// Public : codigo al que el navegador puede acceder --> aca va todo lo referido a JS CSS EL CLIENTE IMAGENES ETC
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server

app.listen(app.get('port'), ()=>{
    console.log('APLICACION EJECUTANDOSE EN PUERTO', app.get('port'))
})

