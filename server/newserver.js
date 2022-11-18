const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const db = require('./database')
const { verifyToken } = require('./middlewares/verifyToken')


app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
const port = process.env.PORT || 3001 // app osaa hakea oikean portin palveluntarjoajalta. <- note to self

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Signup
app.post('/signup', async (req, res, next) => {
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

app.get('/', (req, res) => {
    console.log(req.decoded)
    console.log("Palvelimeen tultiin kyselemään dataa")
    res.send("Nyt ollaan palvelussa, joka edellyttää kirjautumisen")
});

//route imports
const loginRoute = require('./routes/login')
const tenttiRoute = require('./routes/tentit')
const kysymysRoute = require('./routes/kysymykset')
const kayttajaRoute = require('./routes/kayttajat')
const vastausRoute = require('./routes/vastausvaihtoehdot')

app.use('/login', loginRoute)
app.use('/tentit', tenttiRoute)
app.use('/kysymykset', kysymysRoute)
app.use('/kayttajat', kayttajaRoute)
app.use('/vastausvaihtoehdot', vastausRoute)

//muista lisätä verifyToken paikkoihin, jotka suljetaan!

app.get('/', (req, res) => {
    res.send('Root route')
})

app.listen(port, () => console.log(`Server listening on port: ${port}`))