const debug = require("debug")("robots:database");

const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.connect(process.env.MONGODB_STRING, (error) => {
      if (error) {
        debug(chalk.red("Error trying to conect to BD"));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green("Succesfully connected"));
      resolve();
    });
  });

module.exports = connectDB;
