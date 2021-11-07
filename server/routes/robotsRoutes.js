const express = require("express");
const {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:id", getRobotById);

router.post("/create", createRobot);

router.put("/update", updateRobot);

module.exports = router;
