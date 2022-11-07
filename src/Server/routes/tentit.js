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

module.exports = router