const router = require("express").Router();

const { isUser } = require("../middleware");

const { Card, Set, Team, Attribute } = require("../db/models");

const sequelize = require("sequelize");

// collection api routes only available to logged in users
router.use(isUser);

router.get("/", (req, res) => {
  res.send("you have reached the collection api route!!!!!!!!");
});

module.exports = router;
