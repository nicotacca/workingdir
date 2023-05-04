const express = require('express')
const router = express.Router()

// IMPORTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR LCDLL
const { pool2 } = require('../database')
const { pool } = require('../database')

// GETS

router.get('/', async (req, res) => {
    res.render('./intrav1/opis/')
    const prueba = await (await pool2.query('select * from facOrdenes fo where nOrden = 539698')).recordset
    console.log(prueba)
})



// POSTS

// GETS PARAMS

// POSTS PARAMS

module.exports = router