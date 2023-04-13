const express = require('express')
const router = express.Router()
const pool = require('../database')
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')


// GETS

router.get('/add', isLoggedIn, (req, res) => {
    res.render('./../views/links/add.hbs')
})


router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id])

    console.log(links)
    res.render('links/list', {links: links})

})

// POSTS

router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    }
    console.log(newLink)
    await pool.query('INSERT INTO links set ?', [newLink])
    req.flash('success', 'Link guardado correctamente!')
    res.redirect('/links')
})


// QUERY PARAMS (VAN DEPSUES SEGUN CURSO QUE HICIMOS ANTES)

// GETS 

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params
    pool.query('DELETE FROM links WHERE ID = ?', [id])
    req.flash('success', 'Link eliminado correctamente!')
    res.redirect('/links')
})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id])
    console.log(link[0])
    res.render('links/edit', {link: link[0]})
    //res.send('ESTAMOS EN EDIT')
})
 
// POSTS

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const { title, url, description } = req.body
    const newLink = {
        title,
        description,
        url
    }
    // ? es el parametro que se pasa
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id])
    req.flash('success', 'Link editado correctamente!')
    res.redirect('/links')
})

module.exports = router