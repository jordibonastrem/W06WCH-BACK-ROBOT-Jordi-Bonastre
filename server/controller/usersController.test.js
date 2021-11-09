const { findOne } = require("../../database/models/user");
const User = require("../../database/models/user");

jest.mock("../../database/models/user");
jest.mock("bcrypt");

describe("Given a checkLogin function", () => {
  describre("When it recieves wrong username and password", () => {
    test("Then it should invoke next function with a 401 error", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      console.log();
      const req = {
        body: {
          username: "Luis",
          password: "Luis",
        },
      };
      const next = jest.fn();
      const expectedError = new Error("Wrong credentials");
      expectedError, (code = 401);

      await loginUser(req, null, next);
      expect(next.mock.calls[0][0].toHaveProperty("code", expectedError.code));
      expect(next).toHaveBeenCalled(expectedError);
    });
  });

  describe("When it recieves a right username and a wrong password", () => {
    test("Then it should invoke the next function witha 401 error ", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        id: "2",
        username: "luis",
        password: "luis",
      });
      const req = {
        body: {
          username: "luis",
        },
      };
    });
  });
});
