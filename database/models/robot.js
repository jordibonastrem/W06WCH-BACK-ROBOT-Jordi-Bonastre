const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  caracteristics: {
    type: Object,
    required: true,
    velocity: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    resistence: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    dateOfCreation: {
      type: Date,
      required: true,
    },
  },
});

const Robot = model("Robots", robotSchema, "Robots");

module.exports = Robot;
