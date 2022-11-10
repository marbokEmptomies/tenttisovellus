const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', async (req, res) => {
    try {
        const result = 'SELECT * FROM tentti ORDER BY id ASC'
        const { rows } = await db.query(result)
        res.send(rows)
    } catch (error) {
        console.log("Tenttidatan hakuongelma: ", error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { nimi } = req.body
        const text = 'INSERT INTO tentti (nimi) VALUES ($1)'
        const values = [nimi]
        db.query(text, values)
        res.send("pelittää")
    } catch (error) {
        console.log("Ei pelitä", error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { nimi } = req.body
        const { id } = req.params
        const text = 'UPDATE tentti SET nimi = ($1) WHERE id = ($2)'
        const values = [nimi, id]
        await db.query(text, values)
        res.send(`Tentti ID:llä ${req.params.id} muokattu.`)
    } catch (error) {
        console.log("Tentin muokkaus ei onnistunut", error.stack)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const text = 'DELETE FROM tentti WHERE id=($1)'
        const values = [req.params.id]
        await db.query(text, values)
        send.res(`Tentti ID:llä ${req.params.id} poistettu.`)
    } catch (error) {
        console.log("Tentin poistaminen epäonnistui", error.stack)
    }
})

module.exports = router