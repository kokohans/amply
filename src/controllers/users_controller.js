const router = require("express").Router();
const User = require("../models/user_model");

const get_users = (req, res) => {
  User.find((err, user) => {
    if (err) {
      return res.json({
        message: null,
        err: true,
      });
    }
    res.json({
      message: user,
      err: null,
    });
  });
};

const insert_user = (req, res) => {
  let username = req.body["username"];
  let email = req.body["email"];
  let description = req.body["description"];

  new_user = new User({
    username: username,
    email: email,
    description: description,
  });
  new_user.save((err, res_query) => {
    if (err) {
      return res.status(400).json({
        message: err,
        err: true,
      });
    } else {
      return res.status(201).json(res_query);
    }
  });
};

router.get("/", get_users);
router.post("/", insert_user);

module.exports = router;
