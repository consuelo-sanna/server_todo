/*  qui sono presenti tutte le possibili "strade" e i comandi per
 *  l'autenticazione; è chi si occupa di controllare i dati e restituire il token
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const authMid = require("../../middleware/authMiddleware");

// User Model
/* creo una var che fa riferimento al modello del mio db */
const User = require("../../models/UserModel");

// @route  POST api/auth
// @desc   Auth user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "User Does not exists" });

      //Validate password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name
              }
            });
          }
        );
      });
    })
    .catch(err => console.log(err.message));
});

// autentica l'utente attraverso il token
// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get("/user", authMid, (req, res) => {
  User.findById(req.user.id)
    .select("-password") //seleziona tutto il contenuto dell User ma NON la password
    .then(user => res.json(user))
    .catch(err => console.log(err.message));
});

module.exports = router;
