const router = require("express").Router();

const { isAdmin } = require("../middleware");

const { Card, Set, Team, Attribute } = require("../db/models");

const sequelize = require("sequelize");

// library api routes only available to logged in users who are administrators
router.use(isAdmin);

router.get("/", (req, res) => {
  res.send("you have reacthed the library api route!!!!");
});

module.exports = router;
