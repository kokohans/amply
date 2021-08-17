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

const insert_post = (req, res) => {
  let post_body = req.body["body"];
  let user_id = req.body["user"];
  let created_at = new Date().toISOString();

  if (post_body.length > 1000) {
    return res.status(400).json({
      message: "exceed 1000 character",
      err: true,
    });
  }

  let new_post = new Post({
    body: post_body,
    user: user_id,
    created_at: created_at,
  });

  new_post.save((err, res_query) => {
    if (err) {
      return res.status(400).json({
        message: err,
        err: true,
      });
    } else {
      return res.status(201).json({
        message: res_query,
        err: null,
      });
    }
  });
};

router.get("/", get_posts);
router.get("/:post_id", get_one_post);
router.post("/", insert_post);

module.exports = router;
