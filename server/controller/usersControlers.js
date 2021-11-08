const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const checkLogin = async (req, res, next) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    console.log(user.name);
    console.log(user.password);
    const rightPassword = await bcrypt.compare(password, user.password);

    if (rightPassword) {
      const token = await jwt.sign(
        { name, password: user.password },
        process.env.SECRET
      );
      res.json({ token });
    } else {
      const error = new Error("Wrong credentials");
      error.code = 401;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Authentification failed";
    next(error);
  }
};

module.exports = {
  checkLogin,
};
