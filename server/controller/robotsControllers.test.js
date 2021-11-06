const Robot = require("../../database/models/robot");
const { getRobots } = require("./robotsController");

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
