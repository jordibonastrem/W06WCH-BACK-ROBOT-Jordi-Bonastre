const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const robotsRoutes = require("./routes/robotsRoutes");

const app = express();
app.use(express.json());
app.use(cors());

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Listening to port ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Error launching the server."));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`Port ${port} its already in use.`));
    }
  });
};

app.use(morgan("dev"));
app.use("/robots", robotsRoutes);

module.exports = initializeServer;
