const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const port = process.env.PORT || 3001 // app osaa hakea oikean portin palveluntarjoajalta. Tutki aihetta lisää, huara. <- note to self

const tenttiRoute = require('./routes/tentit')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/tentit', tenttiRoute)

app.get('/', (req, res) => {
    res.send('Root route')
})

app.listen(port, () => console.log(`Server listening on port: ${port}`))