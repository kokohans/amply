const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;

const user_path = "/api/v1/users";

chai.use(chaiHTTP);

let server = require("../../src/app");

describe("GET /api/v1/users", () => {
  it("should return 200 OK", (done) => {
    chai
      .request(server)
      .get(user_path)
      .end((err, res) => {
        expect(res.statusCode).to.equals(200);
        done();
      });
  });

  it("should return response with JSON", (done) => {
    chai
      .request(server)
      .get(user_path)
      .end((err, res) => {
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
