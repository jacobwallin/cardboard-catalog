const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

const { Card, Set, Brand, Team, Attribute } = require("./db/models");

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());

app.use("/api", require("./api"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(8080);
