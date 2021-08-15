const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_AMPLY;

const db = mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const posts_controller = require("./controllers/posts_controller");
const users_controller = require("./controllers/users_controller");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/posts", posts_controller);
app.use("/api/v1/users", users_controller);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
