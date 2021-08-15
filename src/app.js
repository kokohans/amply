const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const posts_controller = require("./controllers/posts_controller");
const users_controller = require("./controllers/users_controller");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/posts", posts_controller);
app.use("/api/v1/users", users_controller);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
