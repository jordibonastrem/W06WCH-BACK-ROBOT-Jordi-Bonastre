const { ValidationError } = require("express-validation");

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Validation ERROR";
  }

  const message = error.code ? error.message : "Unexpected error";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  generalErrorHandler,
};

// generalError
// if(error instanceof ValidationError){
//   error.code =400;
//   error.message="Evil"
// }
