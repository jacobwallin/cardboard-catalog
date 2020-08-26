const router = require("express").Router();
const { Card, Set } = require("../db/models");

router.get("/", (req, res) => {
  Set.findAll({
    where: {
      year: 2020,
    },
    include: [
      {
        model: Card,
        attributes: ["id"],
      },
    ],
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
    },
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
