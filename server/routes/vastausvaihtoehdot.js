const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", async (req, res) => {
  try {
    const result = "SELECT * FROM vastausvaihtoehto";
    const { rows } = await db.query(result);
    res.status(200).send(rows);
  } catch (error) {
    console.log("Vastausvaihtoehtojen hakuongelma: ", error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { kysymys_id, nimi, onkooikein } = req.body;
    const text =
      "INSERT INTO vastausvaihtoehto (kysymys_id, nimi, onkooikein) VALUES ($1, $2, $3) RETURNING id";
    const result = await db.query(text, [kysymys_id, nimi, onkooikein]);
    res
      .status(200)
      .send({
        message: `Uusi vastausvaihtoehto lisätty kysymykseen: ${kysymys_id}. Vastausvaihtoehdon id on ${result.rows[0].id}`,
        vastauksen_id: result.rows[0].id}
      );
  } catch (error) {
    res.status(500).send(error);
    console.log("Kysymyksen lisäys epäonnistui", error.stack);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { uusiKysymys_id, uusiNimi, uusiOikein } = req.body;
    console.log("oikea vastaus-check", uusiOikein)
    const text =
      "UPDATE vastausvaihtoehto SET kysymys_id = ($1), nimi = ($2), onkooikein = ($3) WHERE id = ($4)";
    console.log(req.body);
    await db.query(text, [uusiKysymys_id, uusiNimi, uusiOikein, req.params.id]);
    res
      .status(201)
      .send(
        `Vastausvaihtoehto muutettu ID:llä ${req.params.id}. Kysymyksen ID: ${uusiKysymys_id}`
      );
  } catch (error) {
    res.status(500).send(error);
    console.log("Vastausvaihtoehdon muokkaamisessa virhe ", error.stack);
  }
});

router.delete("/:id",
  async (req, res) => {
    try {
      const text = "DELETE FROM vastausvaihtoehto WHERE id=($1)";
      const values = [req.params.id];
      await db.query(text, values);
      res
        .status(204)
        .send(`Vastausvaihtoehto ID:llä ${req.params.id} poistettu`);
    } catch (error) {
      res.status(500).send(error);
      console.log("Vastausvaihtoehdon poistaminen epäonnistui", error.stack);
    }
  });

module.exports = router;
