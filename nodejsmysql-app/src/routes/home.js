const express = require('express')
const router = express.Router()
//const pool2 = require('../../../database')


// GETS

router.get('/', (req, res) => {
    res.render('./intrav1/home.hbs')
})



// POSTS

// GETS PARAMS

// POSTS PARAMS

module.exports = router