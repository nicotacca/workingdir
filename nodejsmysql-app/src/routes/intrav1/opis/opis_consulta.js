const express = require('express')
const router = express.Router()
const pool2 = require('../../../database')


// GETS
router.get('/top100', (req, res) => {
    res.render('./../../../views/links')
})

router.get('/probando', (req, res) => {
    res.send('todo correcto')
})

router.get('/', (req, res) => {
    res.render('./../../../views/intrav1/home.hbs')
})

// POSTS

// GETS PARAMS

// POSTS PARAMS

module.exports = router