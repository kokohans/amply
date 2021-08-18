const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;

chai.use(chaiHTTP);

const User = require("../../src/models/user_model");
const Post = require("../../src/models/post_model");

let server = require("../../src/app");

describe("Post Controller", () => {
  let uid = "";
  let post_id = "";

  before(async () => {
    User.deleteMany({});
    Post.deleteMany({});

    let user_data = {
      username: "kokohan_post",
      email: "hans_post@gmail.com",
      description: "this is my personal space",
    };

    let new_user = new User(user_data);
    let user = await new_user.save();
    uid = user["_id"];

    let post_data = {
      body: "this is hans's tweet",
      comments: [],
      user: uid,
      created_at: new Date().toISOString(),
    };

    let new_post = new Post(post_data);

    let post = await new_post.save();
    post_id = post["_id"];
  });

  after(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("GET /api/v1/posts", () => {
    let post_url = "/api/v1/posts";
    let response, error;

    before((done) => {
      chai
        .request(server)
        .get(post_url)
        .end((err, res) => {
          error = err;
          response = res;
          done();
        });
    });

    it("should return 200 OK", () => {
      expect(response.statusCode).to.equals(200);
    });

    it("should return response with JSON", () => {
      expect(response.body).to.have.property("message");
      expect(response.body["message"]).to.be.an.an("array");
      expect(response.body["err"]).to.be.null;
    });
  });

  describe("GET /api/v1/posts/:post_id", () => {
    let post_url = "/api/v1/posts/";
    let response, error;

    before((done) => {
      chai
        .request(server)
        .get(post_url + post_id)
        .end((err, res) => {
          error = err;
          response = res;
          done();
        });
    });

    it("should return 200 OK", () => {
      expect(response.statusCode).to.equals(200);
    });

    it("should return response with JSON", () => {
      expect(response.body).to.have.property("message");
      expect(response.body["err"]).to.be.null;
    });
  });

  describe("POST /api/v1/users", () => {
    const post_path = "/api/v1/posts";

    describe("with valid input", () => {
      it("should response with HTTP 201", (done) => {
        let post_data = {
          body: "this is hans's tweet",
          user: uid,
        };

        chai
          .request(server)
          .post(post_path)
          .send(post_data)
          .end((err, res) => {
            expect(res.statusCode).to.equals(201);
            expect(res.body["err"]).to.be.null;
            done();
          });
      });
    });

    describe("with body more than 1000 char", () => {
      it("should response with HTTP 401", (done) => {
        let post_data = {
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur, \
          nunc vitae vestibulum dapibus, arcu est maximus elit, et sollicitudin nibh arcu a enim. \
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. \
          Aenean id elit nunc. Mauris a velit a neque elementum feugiat non sit amet nulla. Mauris\
           gravida ullamcorper fringilla. Aliquam sed viverra mauris, eu gravida nunc. Praesent \
           pharetra urna in leo tincidunt, quis fermentum lorem sagittis. In a metus ligula. \
           Vivamus sed ultrices diam. Orci varius natoque penatibus et magnis dis parturient \
           montes, nascetur ridiculus mus. Donec a tortor eu mauris blandit ultricies nec in \
           tortor. Praesent aliquam sit amet nisi et dignissim. Aenean et suscipit augue. \
           Suspendisse commodo rutrum risus vel aliquet. Phasellus tristique at augue quis porta. \
           Proin finibus ornare sem, non sodales lorem cursus sed. Donec ultrices ligula sed condimentum \
           congue. Maecenas dictum neque condimentum aliquet posuere. Quisque in dignissim felis. \
           Phasellus nec tortor justo. Sed accumsan risus eu sollicitudin tristique. Lorem ipsum dolor \
           sit amet, consectetur adipiscing elit. Phasellus egestas magna non bibendum porta. Curabitur \
           volutpat elit vitae magna posuere eleifend. Vestibulum non sapien velit. Curabitur tristique \
           sed ex nec fermentum. Aliquam in porta dui. Fusce lacinia et ex in.",
          user: uid,
        };

        chai
          .request(server)
          .post(post_path)
          .send(post_data)
          .end((err, res) => {
            expect(res.statusCode).to.equals(400);
            expect(res.body["err"]).to.be.true;
            expect(res.body["message"]).to.eq("exceed 1000 character");
            done();
          });
      });
    });

    describe("with invalid input", () => {
      it("should return HTTP 400", (done) => {
        let post_data = {
          body: null,
          user: uid,
        };

        chai
          .request(server)
          .post(post_path)
          .send(post_data)
          .end((err, res) => {
            expect(res.statusCode).to.equals(400);
            expect(res.body["err"]).to.be.true;
            done();
          });
      });
    });
  });
});
