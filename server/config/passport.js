const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/models");

const strategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  (username, password, done) => {
    User.findOne({
      where: {
        username: username,
      },
    })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        if (user.verifyPassword(password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        done(err);
      });
  }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch((err) => done(err));
});
