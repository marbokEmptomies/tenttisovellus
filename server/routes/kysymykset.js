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
})

router.post('/', async (req, res) => {
    try {
        const { nimi, pisteet } = req.body
        const values = [ nimi, pisteet ]
        const text = 'INSERT INTO kysymys (nimi, pisteet) VALUES ($1, $2)'
        await db.query(text, values)
        res.send("Uusi kysymys lisätty")
    } catch (error) {
        console.log("Kysymyksen lisäys epäonnistui", error.stack)
    }
})

router.delete('/:id'), async (req, res) => {
    try {
        const text = 'DELETE FROM kysymys WHERE id=($1)'
        const values = [req.params.id]
        await db.query(text, values)
        res.send(`Kysymys ID:llä ${req.params.id} poistettu`)
    } catch (error) {
        console.log("Kysymyksen poistaminen epäonnistui", error.stack)
    }
}

module.exports = router