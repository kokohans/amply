const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;

chai.use(chaiHTTP);

let server = require("../../src/app");

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res.statusCode).to.equals(200);
        expect(err).is.null;
        done();
      });
  });
});

describe("GET /api/v1/posts", () => {
  it("should return 200 OK", (done) => {
    chai
      .request(server)
      .get("/api/v1/posts")
      .end((err, res) => {
        expect(res.statusCode).to.equals(200);
        done();
      });
  });
});
