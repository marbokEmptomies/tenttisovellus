const db = require('../database')

const admin = async (req, res, next) => {

    try {
      result = await db.query("SELECT * FROM käyttäjä WHERE email = $1 ", [req.decoded?.email])
      let isAdmin = result.rows[0].isadmin
      console.log("Admin-status: ", result.rows[0].isadmin)
      if (isAdmin) { return next() } {
        res.status(401).send("no access!")
      }  
    }
    catch (error) {
      res.status(500).send(error)
    }
}

module.exports = admin