const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const port = process.env.PORT || 3001 // app osaa hakea oikean portin palveluntarjoajalta. <- note to self

//route imports
const tenttiRoute = require('./routes/tentit')
const kysymysRoute = require('./routes/kysymykset')
const kayttajaRoute = require('./routes/kayttajat')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/tentit', tenttiRoute)
app.use('/kysymykset', kysymysRoute)
app.use('/kayttajat', kayttajaRoute)

app.get('/', (req, res) => {
    res.send('Root route')
})

app.listen(port, () => console.log(`Server listening on port: ${port}`))