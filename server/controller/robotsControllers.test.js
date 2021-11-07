const Robot = require("../../database/models/robot");
const { getRobots, getRobotById } = require("./robotsController");

jest.mock("../../database/models/robot");

describe("Given a getRobots function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json", async () => {
      const robots = [
        {
          id: 1,
          name: "Sophia",
          img: "https://grupoadd.es/wp-content/uploads/2019/08/Robot-Sophia-3-Grupo-ADD.jpg",
          caracteristics: {
            velocity: 2,
            resistence: 3,
            dateOfCreation: "2021-05-10T22:00:00.000+00:00",
          },
        },
      ];
      Robot.find = jest.fn().mockResolvedValue(robots);

      const res = {
        json: jest.fn(),
      };

      await getRobots(null, res);
      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});

describe("Given a getRobotsById function", () => {
  describe("When it receives a request with an id 4, a res object and a next function", () => {
    test("Then it should invoke Robot.findById with a 4", async () => {
      Robot.findById = jest.fn().mockResolvedValue({});
      const idRobot = 4;
      const req = {
        params: {
          idRobot,
        },
      };

      const res = {
        json: () => {},
      };
      const next = () => {};

      await getRobotById(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
  });

  describe("And Robot.findById rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Robot.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(404);
    });
  });

  describe("And Pet.findById resolves to androidv2", () => {
    test("Then it should invoke res.json with androidv2", async () => {
      const id = 3;
      const androidv2 = {
        id,
        name: "androidv2",
        age: 13,
        caracteristics: {
          velocity: 11,
          resistence: 2,
          date: "3/10/2021",
        },
      };
      Robot.findById = jest.fn().mockResolvedValue(androidv2);
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: jest.fn(),
      };

      await getRobotById(req, res);

      expect(res.json).toHaveBeenCalledWith(androidv2);
    });
  });
});
