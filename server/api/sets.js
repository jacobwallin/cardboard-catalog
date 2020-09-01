const router = require("express").Router();
const { Card, Set, Team, Attribute } = require("../db/models");

const sequelize = require("sequelize");

router.get("/", (req, res) => {
  Set.findAll({
    include: [
      {
        model: Card,
        attributes: ["id"],
      },
    ],
    order: [["year", "DESC"]],
  })
    .then((sets) => {
      // reduce the array of cards the belong to the set
      // to be the total sum of cards in the set
      sets.forEach((set) => {
        set.dataValues.Cards = set.Cards.reduce((total) => {
          return total + 1;
        }, 0);
      });
      res.json(sets);
    })
    .catch((err) => res.sendStatus(404));
});

router.get("/:id", (req, res) => {
  Set.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Card,
      include: {
        all: true,
      },
    },
    order: [[Card, "number", "ASC"]],
  })
    .then((set) => {
      res.json(set);
    })
    .catch((err) => res.sendStatus(404));
});

router.post("/", (req, res) => {
  res.send("set has not ben created");
});

module.exports = router;
