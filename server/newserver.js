const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser');
/* const { verifyToken } = require('./middlewares/verifyToken')
const { admin } = require('./middlewares/admin') */
const https = require('https')
const fs = require('fs')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
const port = process.env.PORT || 4000 // app osaa hakea oikean portin palveluntarjoajalta. <- note to self

app.get('/', (req, res) => {
    console.log(req.decoded)
    console.log("Palvelimeen tultiin kyselemään dataa")
    res.send("Toot toot motherfucker!")
});

//route imports
const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const tenttiRoute = require('./routes/tentit')
const kysymysRoute = require('./routes/kysymykset')
const kayttajaRoute = require('./routes/kayttajat')
const vastausRoute = require('./routes/vastausvaihtoehdot')

app.use('/signup', signupRoute)
app.use('/login', loginRoute)
app.use('/tentit', tenttiRoute)
app.use('/kysymykset', kysymysRoute)
app.use('/kayttajat', kayttajaRoute)
app.use('/vastausvaihtoehdot', vastausRoute)

//muista lisätä verifyToken paikkoihin, jotka suljetaan!

app.get('/', (req, res) => {
    res.send('Root route')
})

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