const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const searchedPet = await Robot.findById(_id);
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
