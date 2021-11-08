const bcrypt = require("bcrypt");
const User = require("./database/models/user");

(async () => {
  User.create({ name: "nunu", password: await bcrypt.hash("pwd", 10) });
})();
