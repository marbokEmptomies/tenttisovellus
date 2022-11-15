const { response } = require('express')
const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()
const db = require('../database')

//Hae kaikki tentit db:stä
router.get('/', async (req, res) => {
    try {
        const result = 'SELECT * FROM tentti ORDER BY id ASC'
        const { rows } = await db.query(result)
        res.status(200).send(rows)
    } catch (error) {
        res.status(500).send(error)
        console.log("Tenttidatan hakuongelma: ", error)
    }
})

//Hae ID:llä tentti db:stä sisältäen siihen kuuluvat kysymykset ja vastausvaihtoehdot
router.get('/:id', async (req, res) => {
    try {
      const haeTentti = 'SELECT * FROM tentti WHERE id = ($1)';
      const { rows: tenttiData } = await db.query(haeTentti, [
        req.params.id,
      ]);
  
      const haeKysymys =
        'SELECT * FROM kysymys WHERE id IN (SELECT kysymys_id FROM kysymys_tentti_liitos WHERE tentti_id = ($1))';
      const { rows: kysymysData } = await db.query(haeKysymys, [
        req.params.id,
      ]);
  
      const haeVastaus =
        'SELECT * FROM vastausvaihtoehto WHERE kysymys_id IN (SELECT kysymys_id FROM kysymys_tentti_liitos WHERE kysymys_id = (kysymys_id))';
      const { rows: vastausData } = await db.query(haeVastaus);
  
      const tenttiObj = {
        tentti: { ...tenttiData[0] },
        kysymykset: [...kysymysData],
        vastaukset: [...vastausData],
      };
  
      res.status(200).send(tenttiObj);
    } catch (error) {
        
        console.error("Virhe tentin haussa", error);
    }
  });

router.post('/', async (req, res) => {
    try {
        const { nimi } = req.body
        const text = 'INSERT INTO tentti (nimi) VALUES ($1)'
        const values = [nimi]
        db.query(text, values)
        res.status(200).send("Uusi tentti lisätty.")
    } catch (error) {
        res.status(500).send(error)
        console.log("Tentin lisäämisessä virhe.", error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { nimi } = req.body
        const { id } = req.params
        const text = 'UPDATE tentti SET nimi = ($1) WHERE id = ($2)'
        const values = [nimi, id]
        await db.query(text, values)
        res.status(201).send(`Tentti ID:llä ${req.params.id} muokattu.`)
    } catch (error) {
        res.status(500).send(error)
        console.log("Tentin muokkaus ei onnistunut", error.stack)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const text = 'DELETE FROM tentti WHERE id=($1)'
        const values = [req.params.id]
        await db.query(text, values)
        send.status(204).res(`Tentti ID:llä ${req.params.id} poistettu.`)
    } catch (error) {
        res.status(500).send(error)
        console.log("Tentin poistaminen epäonnistui", error.stack)
    }
})

module.exports = router