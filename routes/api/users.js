/*
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const schemas = require("../../schemas");
const validation = require("../../middleware/validationMiddleware");

// User Model
/* creo una var che fa riferimento al modello del mio db */
const User = require("../../models/UserModel");

// @route  POST api/users
// @desc   Register new user
// @access Public
router.post("/", validation(schemas.registration, "body"), (req, res) => {
  const saltRounds = 10;
  console.log("stai provando a fare una POST api/user   " + req.body);

  const { email, password, name, lastname } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: "User alredy exists" });

      const newUser = new User({
        name,
        lastname,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    name: user.name,
                    lastname: user.lastname,
                    id: user.id,
                    email: user.email
                  }
                });
              }
            );
          });
        });
      });
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
