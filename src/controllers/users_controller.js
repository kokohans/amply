const router = require("express").Router();
const User = require("../models/user_model");

router.get("/", (req, res) => {
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
});

module.exports = router;
