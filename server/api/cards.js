const router = require("express").Router();
const { Card, Set } = require("../db/models");

const sequelize = require("sequelize");

router.get("/", function (req, res) {
  Card.findAll()
    .then((allCards) => {
      res.json(allCards);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.get("/:id", (req, res) => {
  Card.findOne({
    where: {
      id: req.params.id,
    },
  });
});

router.post("/", function (req, res) {
  console.log("post request!", req.body);
  res.send("success!");
});

module.exports = router;
