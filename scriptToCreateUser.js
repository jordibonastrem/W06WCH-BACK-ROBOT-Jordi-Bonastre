const bcrypt = require("bcrypt");
const User = require("./database/models/user");

(async () => {
  User.create({ name: "Jordi", password: await bcrypt.hash("Jordi123", 10) });
})();
