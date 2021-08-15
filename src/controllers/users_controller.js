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

router.get("/", get_users);

module.exports = router;
