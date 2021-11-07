const express = require("express");
const {
  getRobots,
  getRobotById,
  createRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:id", getRobotById);

router.post("/create", createRobot);

module.exports = router;
