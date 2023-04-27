const express = require('express')
const router = express.Router()
const pool2 = require('../database')


// GETS
router.get('/home', (req, res) => {
    res.render('./../views/intrav1/home.hbs')
})

router.get('/opis', (req, res) => {
    res.send('Este es el endpoint de opis')
})

// POSTS

// GETS PARAMS

// POSTS PARAMS

module.exports = router