const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', async (req, res) => {
    try {
        const result = 'SELECT * FROM kysymys ORDER BY id ASC'
        const { rows } = await db.query(result)
        res.send(rows)
    } catch (error) {
        console.log("Kysymyshaussa virhe", error.stack)
    }
    //db.end()
})

router.post('/', async (req, res) => {
    try {
        const uusiKysymys = ['Milloin on nyt?']
        const text = 'INSERT INTO kysymys (nimi) VALUES ($1)'
        await db.query(text, uusiKysymys)
        res.send("Uusi kysymys lisätty")
    } catch (error) {
        console.log("Kysymyksen lisäys epäonnistui", error.stack)
    }
})

module.exports = router