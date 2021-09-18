const router = require("express").Router();

const { Card, CardData, Player, Team } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.count();
    res.json(allCards);
  } catch (error) {
    next(error);
  }
});

router.get("/:cardId", async (req, res, next) => {
  try {
    const card = await Card.findByPk(req.params.cardId, {
      include: {
        model: CardData,
        include: [{ model: Player }, { model: Team }],
      },
    });
    res.json(card);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
