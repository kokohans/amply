const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "hello world",
    err: null,
  });
});

module.exports = router;
