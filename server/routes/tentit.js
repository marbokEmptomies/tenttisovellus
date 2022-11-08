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
        const text = 'INSERT INTO tentti (nimi) VALUES ($1)'
        const values = ['Jorman käyttöohje']
        db.query(text, values)
        res.send("pelittää")
    } catch (error) {
        console.log("Ei pelitä", error)
    }
})

module.exports = router