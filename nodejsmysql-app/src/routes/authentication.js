const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')

// Ruta para renderizar formulario
router.get('/signup', isNotLoggedIn, async (req, res) => {
    res.render('auth/signup')
})

// Ruta para recibir data del formulario
/* router.post('/signup', async (req, res) => {

    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })

    res.send('RECIBIDO DE SINGUP')

}) */

// Otra manera de escribir lo de arriba
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })
)

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile')
})

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
})


router.get('/logout', (req, res) => {

    // En el video asi; pero me tira error
    //req.logOut()
    //res.redirect('/signin')

    // Stack OFlow
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/signin');
      });
})

module.exports = router