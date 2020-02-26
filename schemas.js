//definisci tutti gli schemi qui sotto

const Joi = require("joi");

const schemas = {
  registration: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    name: Joi.string().allow(""),
    lastname: Joi.string().allow("")
  })
  // define all the other schemas below
};
module.exports = schemas;
