const express = require('express')
const router = express.Router()
const db = require('../database')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async (req, res, next) => {
    const { email, password, name, isadmin } = req.body;
    let result; 
    try {
        let hashed = await bcrypt.hash(password, saltRounds)
        result = await db.query(
            "INSERT INTO käyttäjä (email, password, name, isadmin) VALUES ($1,$2, $3, $4) RETURNING id", [email, hashed, name, isadmin]);
    } catch (error) {
        console.error(error);
        return next();
    }
    let token;
    try {
        token = jwt.sign(
            { id: result.rows[0].id, email: email, isadmin: isadmin },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
    } catch (error) {
        console.error(error)
        return next();
    }
    res.status(201).json({
        success: true,
        data: {
            id: result.rows[0].id,
            email: email,
            token: token
        }
    });
});

module.exports = router