const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})
/* pool.query('SELECT * FROM tentit ORDER BY id ASC', (err, res) => {
  console.log(err, res.rows)
  pool.end()
}) */
const lisaaTentti = async() => {
    try {
        let result = await pool.query("INSERT INTO tentit (nimi) VALUES ('tentti5')")
        console.log('tenttejä lisättiin: ', result.rowCount, ' kpl')
        pool.end()
    } catch (error) {
        console.log("virhe: ", error)   
    }    
}

const haeTentti = async() => {
    try {
        let result = await pool.query("SELECT * FROM tentit WHERE nimi='Pyramidihuijaamisen alkeet'")
        console.log('tentti haettu nimellä: ', result.rows)
    } catch (error) {
        console.log("virhetilanne", error)
    }
}

const muokkaaTentinNimea = async() => {
    try {
        let result = await pool.query("UPDATE tentit SET nimi='Pyramidihuijaamisen jatko' WHERE id=26")
        console.log("Nimi muutettu")
    } catch (error) {
        console.log("virhetilanne", error)
    }
}

const haeTenttiId = async() => {
    try {
        let result = await pool.query("SELECT * FROM tentit WHERE id=26")
        console.log("Haetun tentin id: ", result)
    } catch (error) {
        console.log("virhe: ", error)
    }
}

const delTenttiById = async() => {
    try {
        let result = await pool.query("DELETE FROM tentit WHERE id=29")
        console.log("Id:n mukaan poistettu", result.rowCount)
    } catch (error) {
        console.log("Virhe: ", error)
    }
}

const haeTentitAbc = async() => {
    try {
        let result = await pool.query("SELECT * FROM tentit ORDER BY nimi DESC") //nousevassa järjestyksessä ASC
        console.log("Aakkosjärjestyksessä: ", result.rows)
    } catch (error) {
        console.log("virhe", error)
    }
}

const haeIdSpesifisti = async() => {
    try {
        let result = await pool.query("SELECT * FROM tentit WHERE id IN ('26', '27', '28')") //hakee tentit spesifillä ID:llä
        console.log("tulos: ", result.rows)
    } catch (error) {
        console.log("Kakka potkurissa: ", error)
    }
}

const asetaDate = async() => {
    try {
        let result = await pool.query("UPDATE tentit SET date='NOW()'")
        console.log("tulos ", result.rows)
    } catch (error) {
        console.log("Virhe", error)
    }
}

//asetaDate()
//haeIdSpesifisti()
//haeTentitAbc()
//lisaaTentti()
//haeTentti()
//muokkaaTentinNimea()
//haeTenttiId()
//delTenttiById()




