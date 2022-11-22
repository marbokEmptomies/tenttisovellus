const express = require("express");
const router = express.Router();
const db = require("../database");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  let { email, password } = req.body;
  let passwordMatch = false;
  let existingUser;
  try {
    // existingUser = await User.findOne({ email: email });
    let result = await db.query("SELECT * FROM käyttäjä where email=$1", [
      email,
    ]);
    existingUser = {
      password: result.rows[0].password,
      email: result.rows[0].email,
      id: result.rows[0].id,
    };
    passwordMatch = await bcrypt.compare(password, existingUser.password);
  } catch {
    console.log(error);
    return next();
  }

  if (!passwordMatch) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }

  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      "secretkeyappearshere", //.env
      { expiresIn: "1h" }
    );
  } catch (error) {
    console.log(error);
    return next();
  }

  res.status(200).json({
    success: true,
    käyttäjä: {
      id: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
});

module.exports = router;
