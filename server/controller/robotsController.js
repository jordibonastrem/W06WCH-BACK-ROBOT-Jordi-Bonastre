const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const searchedPet = await Robot.findById(id);
    if (searchedPet) {
      res.json(searchedPet);
    } else {
      const error = new Error("Robot not found");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    res.json(newRobot);
  } catch (error) {
    error.code = 400;
    error.message = "Error on creating a robot!";
    next(error);
  }
};
const updateRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const { _id } = robot;
    const updatedRobot = await Robot.findByIdAndUpdate(_id, robot);
    res.json(updatedRobot);
  } catch (error) {
    error.code = 400;
    error.message = "There was an error when attempting to update a roboto";
    next(error);
  }
};
module.exports = {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
};
