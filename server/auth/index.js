const router = require("express").Router();
const passport = require("passport");

const { User } = require("../db/models");

router.get("/", (req, res) => {
  console.log("THIS IS REQ.USER: ", req.user);
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
    const { firstName, lastName, username, email, password } = req.body;
    User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    })
      .then((user) => {
        // redirect to login and establish session?
        console.log("AFTER REGISTRATION: ", req.session, req.user);
        // At this point, user is not logged in and needs to be redirected to login page
        next();
      })
      .catch((err) => res.send(err));
  },
  passport.authenticate("local"),
  (req, res, next) => {
    res.send("user has been registered and maybe logged in????");
  }
);

router.post("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
});

module.exports = router;
