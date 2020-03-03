//definisci tutti gli schemi qui sotto

const Joi = require("joi");

const schemas = {
  registration: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    name: Joi.string().allow(""),
    lastname: Joi.string().allow(""),
    role: Joi.string().allow("")
  }),
  todoListByUser: {
    user: Joi.string().required()
  },
  todoDel: {
    id: Joi.string().required()
  }
  // define all the other schemas below
};
module.exports = schemas;
