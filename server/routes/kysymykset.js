const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  try {
    const result = "SELECT * FROM kysymys ORDER BY id ASC";
    const { rows } = await db.query(result);
    res.send(rows);
  } catch (error) {
    console.log("Kysymyshaussa virhe", error.stack);
  }
});

router.post("/", async (req, res) => {
  const client = await db.connect();
  const { tentti_id, nimi, pisteet } = req.body;
  try {
    await client.query("BEGIN");
    const kysQuery =
      "INSERT INTO kysymys (nimi, pisteet) VALUES($1, $2) RETURNING id";
    const result = await client.query(kysQuery, [nimi, pisteet]);
    const kysymysTenttiin =
      "INSERT INTO kysymys_tentti_liitos (tentti_id, kysymys_id) VALUES ($1, $2)";
    const kysymysTenttiinValues = [tentti_id, result.rows[0].id];
    await client.query(kysymysTenttiin, kysymysTenttiinValues);
    await client.query("COMMIT");
    res.status(200).send({
      message: "Kysymys lisätty onnistuneesti tenttiin.",
      kysymyksen_id: result.rows[0].id,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("Virhe kysymyksen luomisessa, ", error);
    res.status(500).send(error);
  } finally {
    client.release();
  }
});
/* try {
        const { tentti_id, nimi, pisteet } = req.body
        const text = 'INSERT INTO kysymys (tentti_id, nimi, pisteet) VALUES ($1, $2, $3) RETURNING id'
        const result = await db.query(text, [tentti_id, nimi, pisteet])
        res.send(`Uusi kysymys lisätty tenttiin ID:llä ${tentti_id}. Kysymyksen id on ${result.rows[0].id}`)
    } catch (error) {
        console.log("Kysymyksen lisäys epäonnistui", error.stack)
    }
}) */

router.put("/:id", async (req, res) => {
    try {
    const { uusiNimi, uusiPisteet } = req.body;
    const text =
      "UPDATE kysymys SET nimi = ($1), pisteet = ($2) WHERE id = ($3)";
    console.log(req.body);
    await db.query(text, [ uusiNimi, uusiPisteet, req.params.id]);
    res.send(
      `Kysymys muutettu ID:llä ${req.params.id}.`
    );
  } catch (error) {
    console.log("Kysymyksen muokkaamisessa virhe ", error.stack);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const text = "DELETE FROM kysymys WHERE id=($1)";
    const values = [req.params.id];
    await db.query(text, values);
    res.status(204).send(`Kysymys ID:llä ${req.params.id} poistettu`);
  } catch (error) {
    res.status(500).send(error);
    console.log("Kysymyksen poistaminen epäonnistui", error.stack);
  }
});

module.exports = router;
