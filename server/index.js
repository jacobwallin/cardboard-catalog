const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(9000);
