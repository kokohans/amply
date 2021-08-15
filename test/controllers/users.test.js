const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;

const user_path = "/api/v1/users";
const User = require("../../src/models/user_model");

chai.use(chaiHTTP);

let server = require("../../src/app");

describe("GET /api/v1/users", () => {
  before((done) => {
    User.deleteMany({}, (err) => {});

    let userData = {
      username: "kokohan",
      email: "hans@gmail.com",
      description: "this is my personal space",
    };

    let newUser = new User(userData);
    newUser.save();
    done();
  });

  after((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  it("should return 200 OK", (done) => {
    chai
      .request(server)
      .get(user_path)
      .end((err, res) => {
        expect(res.statusCode).to.equals(200);
        done();
      });
  });

  it("should return all users with JSON", (done) => {
    chai
      .request(server)
      .get(user_path)
      .end((err, res) => {
        expect(res.body).to.have.property("message");
        expect(res.body["message"].length).to.eq(1);
        done();
      });
  });
});
