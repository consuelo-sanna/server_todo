/** Puoi costruire uno schema e validarlo con validate. se result.error == null vuol dire che i dati son buoni */

const Joi = require("joi");

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req[property], schema);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(",");

      console.log("error", message);
      res.status(422).json({ msg: message });
    }
  };
};
module.exports = validationMiddleware;
