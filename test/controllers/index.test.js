const chai = require("chai");
const chaiHTTP = require("chai-http");
const should = chai.should();

chai.use(chaiHTTP);

let server = require("../../src/app");

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
