const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const db = require('./database')
const { verifyToken } = require('./middlewares/verifyToken')
const https = require('https')
const fs = require('fs')
const nodemailer = require('nodemailer')


app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
const port = process.env.PORT || 4000 // app osaa hakea oikean portin palveluntarjoajalta. <- note to self

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
    res.send("Toot toot motherfucker!")
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


//nodemailer-testing 18.11.2022 <- don't twist your balls on this
/* let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'markosoramaki@gmail.com',
        pass: 'mpgpfuhxqleqgtwo'
    }
})

let mailOptions =  {
    from: 'markosoramaki@gmail.com',
    to: 'juvuorin@gmail.com',
    subject: 'Noden kautta nasahtaa',
    text: 'Helppoo ku sika pienenä.'
}

transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
        console.log("Ei pysty lähettämään, ei millään, koska ", error)
    }else{
        console.log("Lähetys onnistui: ", info.response)
    }
}) */

//SSL
https
    .createServer(
        {
            key: fs.readFileSync("./cert/key.pem"),
            cert: fs.readFileSync("./cert/cert.pem"),
        },
        app
    )
        .listen(4000, () => {
        console.log(`server running at port ${port}`)
})