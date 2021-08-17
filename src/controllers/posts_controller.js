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

const get_one_post = (req, res) => {
  let post_id = req.params["post_id"];

  Post.findById(post_id, (err, post) => {
    if (err) {
      return res.status(404).json({ message: "not found", err: true });
    } else {
      return res.status(200).json({ message: post, err: null });
    }
  });
};

router.get("/", get_posts);
router.get("/:post_id", get_one_post);

module.exports = router;
