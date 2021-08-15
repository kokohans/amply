const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const post_controller = require("./controllers/posts_controller");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/posts", post_controller);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
