require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const app = express();
const session = require("express-session");
const passport = require("passport");
const { isUser } = require("./middleware");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db/db");
require("./config/passport");

// app.use(helmet());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json({ limit: 200000 }));
app.use(express.text());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: db,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// api protected for registered users only
app.use("/api", isUser, require("./api"));
app.use("/auth", require("./auth"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use("*", (error, req, res, next) => {
  const status = error.status ? error.status : 500;
  res.status(status);
  res.json(error.message);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
