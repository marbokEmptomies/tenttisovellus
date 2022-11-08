const fs = require('fs');
const express = require('express')  //Jos ei toimi, niin "npm install express"
const cors = require('cors')
const app = express()
const port = 8080


app.use(cors())  //jos ei toimi, niin "npm install cors"
app.use(express.json());

app.get('/', (req, res) => {
  console.log("Palvelimeen tultiin kyselemään dataa")
  const data = fs.readFileSync('./tenttidata.json', { encoding: 'utf8', flag: 'r' }); //Voi kestää useita sekunteja!
  res.send(data)
})
app.post('/', (req, res) => {
  console.log("Palvelimeen tultiin tallentelemaan dataa")
  fs.writeFileSync('tenttidata.json', JSON.stringify(req.body));
  res.send('Tais datan tallennus onnistua, kun tänne tultiin :)')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

