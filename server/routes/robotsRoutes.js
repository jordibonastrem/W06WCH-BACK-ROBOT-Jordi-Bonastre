const express = require("express");
const {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", createRobot);

router.put("/update", updateRobot);

router.delete("/delete/:idRobot", deleteRobot);

module.exports = router;
