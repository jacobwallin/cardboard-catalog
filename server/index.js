const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const session = require("express-session");
const passport = require("passport");

require("./config/passport");

require("dotenv").config();

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());

app.use(
  session({
    secret: "not a secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(8080);
