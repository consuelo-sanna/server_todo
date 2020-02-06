const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  // prende il token (se presente è nell header)
  const token = req.headers["x-auth-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
