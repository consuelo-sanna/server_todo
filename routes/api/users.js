/*
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User Model
/* creo una var che fa riferimento al modello del mio db */
const User = require("../../models/UserModel");

// @route  POST api/users
// @desc   Register new user
// @access Public
router.post("/", (req, res) => {
  const saltRounds = 10;
  console.log("stai provando a fare una POST api/user   " + req.body);

  const { email, password } = req.body;

  //validazione di sicurezza.. poi mettila anche nel FE
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email })
    .then(user => res.status(400).json({ msg: "User alredy exists" }))
    .catch(err => console.log(err.message));

  const newUser = new User({
    email,
    password
  });

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().catch(err => console.log(err.message));
    });
  });
});

module.exports = router;
