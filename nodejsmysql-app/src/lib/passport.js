

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database.js');
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    console.log(req.body)
    //console.log(username)
    //console.log(password)

    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])

    if (rows.length > 0) {
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            done(null, user, req.flash('success','Inicio de sesion EXITOSO ' + user.username))
        } else {
            done(null, false, req.flash('message','Contraseña incorrecta.'))
        }
    } else {
        return done(null, false, req.flash('message','Usuario no existe man.'))
    }
}))

// Definimos a traves de que campos vamos a recibir la data; passreq para pasarle el request a una funcion callback q se ejecuta luego de localstrategy
// 
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    // console.log(req.body)
    const { fullname } = req.body
    const newUser = {
        username,
        password,
        fullname
    }

    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser])
    newUser.id = result.insertId;
    
    //console.log(result)

    // se queda cargando si no hay siguiente instruccion, la redireccion recordar que depende de la estrategia; retorno done donde el primero es error el seg es newUser

    return done(null, newUser)

}))

// Serializar y deserializar; vamos a guardar el user en una sesion


passport.serializeUser((user, done) => {
    done(null, user.id)
})

// vamos a necesitar deserializarlo tmb; necesitamos consutlar a la BD para saber si este USER existe

passport.deserializeUser( async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    done(null, rows[0])
})