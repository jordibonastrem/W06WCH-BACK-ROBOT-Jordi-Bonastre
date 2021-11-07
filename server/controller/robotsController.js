const debug = require("debug")("robots:controller");
const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
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

module.exports = {
  getRobots,
  getRobotById,
};
