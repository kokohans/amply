const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;

const user_path = "/api/v1/users";
const User = require("../../src/models/user_model");

chai.use(chaiHTTP);

let server = require("../../src/app");

describe("User Controller", () => {
  describe("GET /api/v1/users", () => {
    let response, error;

    before((done) => {
      User.deleteMany({});

      let userData = {
        username: "kokohan",
        email: "hans@gmail.com",
        description: "this is my personal space",
      };

      let newUser = new User(userData);
      newUser.save();

      chai
        .request(server)
        .get(user_path)
        .end((err, res) => {
          error = err;
          response = res;
          done();
        });
    });

    after((done) => {
      User.deleteMany({}, (err) => {
        done();
      });
    });

    it("should return 200 OK", () => {
      expect(response.statusCode).to.equals(200);
    });

    it("should return all users with JSON", () => {
      expect(response.body["message"]).to.not.null;
      expect(response.body["message"].length).to.eq(1);
    });
  });
});
