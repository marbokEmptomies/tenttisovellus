const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  //Authorization: 'bearer TOKEN'
  if (!token) {
    res
      .status(200)
      .json({ success: false, message: "Error: Token was not provided." });
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, "secretkeyappearshere");
  req.decoded = decodedToken;
  next();
};

module.exports = verifyToken;
