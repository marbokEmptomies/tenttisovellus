const { response } = require("express");
const express = require("express");
const { reset } = require("nodemon");
const router = express.Router();
const db = require("../database");
const admin = require("../middlewares/admin");
const verifyToken = require("../middlewares/verifyToken");

//Hae kaikki tentit db:stä
router.get("/", async (req, res) => {
  try {
    const result = "SELECT * FROM tentti ORDER BY id ASC";
    const { rows } = await db.query(result);
    res.status(200).send(rows);
  } catch (error) {
    res.status(500).send(error);
    console.log("Tenttidatan hakuongelma: ", error);
  }
});

//Hae ID:llä tentti db:stä sisältäen siihen kuuluvat kysymykset ja vastausvaihtoehdot
router.get("/:id", async (req, res) => {
  try {
    const haeTentti = "SELECT * FROM tentti WHERE id = ($1)";
    const { rows: tenttiData } = await db.query(haeTentti, [req.params.id]);

    const haeKysymys =
      "SELECT * FROM kysymys WHERE id IN (SELECT kysymys_id FROM kysymys_tentti_liitos WHERE tentti_id = ($1))";
    const { rows: kysymysData } = await db.query(haeKysymys, [req.params.id]);

    const haeVastaus =
      "SELECT * FROM vastausvaihtoehto WHERE kysymys_id IN (SELECT kysymys_id FROM kysymys_tentti_liitos WHERE kysymys_id = (kysymys_id))";
    const { rows: vastausData } = await db.query(haeVastaus);
    console.log(vastausData);

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

//Lisää tentti
router.post("/", async (req, res) => {
  try {
    const { nimi, päivämäärä, onkovoimassa } = req.body;
    const text =
      "INSERT INTO tentti (nimi, päivämäärä, onkovoimassa) VALUES ($1, $2, $3) RETURNING id";
    const values = [nimi, päivämäärä, onkovoimassa];
    const {rows} = await db.query(text, values);
    res.status(200).send({
      message:"Uusi tentti lisätty onnistuneesti.",
      tentin_id: rows[0].id
    });
  } catch (error) {
    res.status(500).send(error);
    console.log("Tentin lisäämisessä virhe.", error);
  }
});

//Muokkaa tenttiä id:n perusteella
router.put("/:id", async (req, res) => {
  try {
    const { uusiNimi, uusiPvm, uusiVoimassa } = req.body;
    const { id } = req.params;
    const text =
      "UPDATE tentti SET nimi = ($1), päivämäärä = ($2), onkovoimassa = ($3) WHERE id = ($4)";
    const values = [uusiNimi, uusiPvm, uusiVoimassa, id];
    await db.query(text, values);
    res.status(201).send(`Tentti ID:llä ${req.params.id} muokattu.`);
  } catch (error) {
    res.status(500).send(error);
    console.log("Tentin muokkaus ei onnistunut", error.stack);
  }
});

//Poista tentti id:n perusteella
router.delete("/:id", async (req, res) => {
  try {
    const text = "DELETE FROM tentti WHERE id=($1)";
    const values = [req.params.id];
    await db.query(text, values);
    res.status(204).send(`Tentti ID:llä ${req.params.id} poistettu.`);
  } catch (error) {
    res.status(500).send(error);
    console.log("Tentin poistaminen epäonnistui", error.stack);
  }
});

module.exports = router;
