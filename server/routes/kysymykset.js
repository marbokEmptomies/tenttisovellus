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
        const { tentti_id, nimi, pisteet } = req.body
        const text = 'INSERT INTO kysymys (tentti_id, nimi, pisteet) VALUES ($1, $2, $3) RETURNING id'
        const result = await db.query(text, [tentti_id, nimi, pisteet])
        res.send(`Uusi kysymys lisätty tenttiin ID:llä ${tentti_id}. Kysymyksen id on ${result.rows[0].id}`)
    } catch (error) {
        console.log("Kysymyksen lisäys epäonnistui", error.stack)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { uusiTentti_id, uusiNimi, uusiPisteet } = req.body
        const text = 'UPDATE kysymys SET tentti_id = ($1), nimi = ($2), pisteet = ($3) WHERE id = ($4)'
        console.log(req.body)
        await db.query(text, [uusiTentti_id, uusiNimi, uusiPisteet, req.params.id])
        res.send(`Kysymys muutettu ID:llä ${req.params.id}. Tentin ID: ${uusiTentti_id}`)   
    } catch (error) {
        console.log("Kysymyksen muokkaamisessa virhe ", error.stack)    
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