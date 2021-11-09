const { Joi } = require("express-validation");

const requestSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  requestSchema,
};
