const express = require('express')
//const { isLoggedIn } = require('../lib/auth')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

/* router.get('/home', (req, res) => {
    res.render('/src/views/intrav1/home.hbs')
}) */

module.exports = router