const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    const error = new Error("Token is empty");
    error.code = 401;
    next(error);
  } else {
    try {
      const user = await jwt.verify(token, process.env.SECRET);
      req.name = user.name;
      next();
    } catch (error) {
      error.code = 401;
      error.message = "Incorrect token";
      next(error);
    }
  }
};

module.exports = auth;
