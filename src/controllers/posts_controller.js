const router = require("express").Router();
const Post = require("../models/post_model");

const get_posts = (req, res) => {
  Post.find((err, post) => {
    if (err) {
      return res.json({
        message: null,
        err: true,
      });
    }
    res.json({
      message: post,
      err: null,
    });
  });
};

router.get("/", get_posts);

module.exports = router;
