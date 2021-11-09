/* eslint-disable no-unused-vars */
const { validate } = require("express-validation");
const express = require("express");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const User = require("../../database/models/user");
const { checkLogin } = require("../controller/usersControlers");
const { requestSchema } = require("../schemas/requestSchema");
require("dotenv").config();

const router = express.Router();

router.post("/login", validate(requestSchema), checkLogin);
// router.get("/", async (req, res) => {
//   mongoose.set("debug", true);
//   const user = await User.create({
//     name: "Jordi",
//     password: await bcrypt.hash("Jordi123", 10),
//   });
//   console.log(user);
//   res.json(user);
// });

module.exports = router;
