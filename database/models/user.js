const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.set("toJSON", {
//   virtuals: true,
//   transform: (doc, ret) => {
//     // eslint-disable-next-line no-underscore-dangle
//     delete ret._id;
//   },
// });
const User = model("User", userSchema, "Users");

module.exports = User;
