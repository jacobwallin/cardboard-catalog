const router = require("express").Router();
const passport = require("passport");

const { User } = require("../db/models");

router.get("/", (req, res) => {
  if (req.user) res.json(req.user);
  res.json(undefined);
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.json(req.user);
});

router.post(
  "/register",
  (req, res, next) => {
    // explicitly destructure each field to prevent isAdmin or any other data from being sent to db
    const { name, username, email, password } = req.body;
    User.create({
      name,
      username,
      email,
      password,
    })
      .then((user) => {
        next();
      })
      .catch((err) => {
        // set message to error from database
        err.message = err.errors[0].message;
        next(err);
      });
  },
  passport.authenticate("local"),
  (req, res, next) => {
    res.json(req.user);
  }
);

router.post(
  "/demo",
  (req, res, next) => {
    // set username and password
    req.body.demoUsername = process.env.DEMO_USERNAME;
    req.body.demoPassword = process.env.DEMO_PASSWORD;
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
  const { username } = req.body;
  User.findOne({ where: { username: username } })
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
  const { email } = req.body;
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
