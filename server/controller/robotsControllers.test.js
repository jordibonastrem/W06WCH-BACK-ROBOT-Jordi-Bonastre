/* eslint-disable no-underscore-dangle */
const Robot = require("../../database/models/robot");
const {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
} = require("./robotsController");

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
      expect(error.code).toBe(400);
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

describe("Given a createRobot function", () => {
  describe("When it receives a request ", () => {
    test("Then it should return a response with the new robot", async () => {
      const res = {
        json: jest.fn(),
      };

      const c3po = {
        id: 5,
        name: "c3po",
        img: "r2d2.org",
        caracteristics: {
          velocity: 3,
          resistence: 3,
          dateOfCreation: "8/3/2000",
        },
      };
      const req = { body: c3po };
      Robot.create = jest.fn().mockResolvedValue(c3po);

      await createRobot(req, res, null);

      expect(Robot.create).toHaveBeenCalledWith(c3po);
      expect(res.json).toHaveBeenCalledWith(c3po);
    });
  });

  describe("When its invoked and it rejects", () => {
    test("then it should invoke next with an error", async () => {
      const error = {};
      Robot.create = jest.fn().mockRejectedValue(error);

      const req = {
        params: {
          id: 1,
        },
      };

      const res = {};
      const next = jest.fn();

      await createRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});

describe("Given an updateRobot function", () => {
  describe("When it is invoked with a request with an id and an updated robot", () => {
    test("Then it should return a res.json with the updated robot", async () => {
      const res = {
        json: jest.fn(),
      };

      const myRobot = {
        _id: 1,
        name: "Matt",
        img: "matt.jpg",
        caracteristics: {
          velocity: 311,
          resistence: 3,
          dateOfCreation: "3/2/1900",
        },
      };
      const req = { body: myRobot };
      Robot.findByIdAndUpdate = jest.fn().mockResolvedValue(myRobot);

      await updateRobot(req, res, null);

      expect(Robot.findByIdAndUpdate).toHaveBeenCalledWith(
        myRobot._id,
        myRobot
      );
    });
  });

  describe("When it recieves a rejected Promise", () => {
    test("Then it should invoke the function next with a error inside", async () => {
      const myRobot = {
        _id: 1,
        name: "Matt",
        img: "matt.jpg",
        caracteristics: {
          velocity: 311,
          resistence: 3,
          dateOfCreation: "3/2/1900",
        },
      };

      const req = {
        params: myRobot,
      };

      Robot.findByIdAndUpdate = jest.fn().mockRejectedValue();
      const next = jest.fn();
      const res = {
        json: jest.fn(),
      };

      await updateRobot(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
