const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = model("User", userSchema, "Users");

User.create({
  name: "Jordi",
  username: "Jordi",
  password: bcrypt.hash("Jordi123", 10),
});
