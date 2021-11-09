const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const checkLogin = async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });

  if (!user) {
    const error = new Error("Autentification Failed");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error = new Error("Autentification Faailed");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.SECRET,
        {
          expiresIn: 24 * 60 * 60,
        }
      );
      res.json({ token });
    }
  }
};

module.exports = {
  checkLogin,
};
