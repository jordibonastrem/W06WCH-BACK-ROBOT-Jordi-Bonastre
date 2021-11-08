const express = require("express");
const auth = require("../middlewares/auth");
const {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", auth, getRobots);

router.get("/:idRobot", auth, getRobotById);

router.post("/create", auth, createRobot);

router.put("/update", auth, updateRobot);

router.delete("/delete/:idRobot/", auth, deleteRobot);

module.exports = router;
