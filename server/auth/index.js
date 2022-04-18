const router = require("express").Router();
const passport = require("passport");

const { User } = require("../db/models");

router.get("/", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(undefined);
  }
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.json(req.user);
});

router.post(
  "/register",
  (req, res, next) => {
    // explicitly destructure each field to prevent isAdmin or any other data from being sent to db
    let { name, username, email, password } = req.body;

    // convert email to lower case to make sure it is unique
    email = email.toLowerCase();

    // create user
    User.create({
      name,
      username,
      username_lowercase: username.toLowerCase(),
      email,
      password,
    })
      .then((user) => {
        next();
      })
      .catch((err) => {
        // set message to error from database
        err.message = err.errors[0].message;
        console.log(err.message);
        next(err);
      });
  },
  passport.authenticate("local"),
  (req, res, next) => {
    res.json(req.user);
  }
);

router.get(
  "/demo",
  (req, res, next) => {
    // get demo username and password
    req.body.username = process.env.DEMO_USERNAME;
    req.body.password = process.env.DEMO_PASSWORD;
    // create session for demo user
    next();
  },
  passport.authenticate("local"),
  (req, res, next) => {
    res.json(req.user);
  }
);

router.post("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
});

// checks if username is available
router.post("/username", (req, res, next) => {
  let { username } = req.body;
  username = username.toLowerCase();
  User.findOne({ where: { username_lowercase: username } })
    .then((user) => {
      if (user) {
        res.json(false);
      } else {
        res.json(true);
      }
    })
    .catch((err) => next(err));
});

// checks if email is available
router.post("/email", (req, res, next) => {
  let { email } = req.body;
  email = email.toLowerCase();
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.json(false);
      } else {
        res.json(true);
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
