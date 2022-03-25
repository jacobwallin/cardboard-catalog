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

router.put("/:cardId", async (req, res, next) => {
  const { serializedTo } = req.body;
  try {
    let card = await Card.findByPk(req.params.cardId);
    card.serializedTo = serializedTo || null;
    card.updatedBy = req.user.id;
    await card.save();

    res.json(card);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { cardDataIds, seriesId } = req.body;

  try {
    const newCards = await Promise.all(
      cardDataIds.map((cardDataId) => {
        return Card.create({
          seriesId,
          cardDataId: newCardData.id,
          createdBy: req.user.id,
          updatedBy: req.user.id,
        });
      })
    );

    // re-query for each new card created to add joins
    const newCardsWithJoins = await Promise.all(
      newCards.map((card) => {
        return Card.findByPk(card.id, {
          include: [
            {
              model: CardData,
              attributes: {
                exclude: ["createdAt", "updatedAt", "createdBy", "updatedBy"],
              },
              include: [
                {
                  model: Player,
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                { model: Team },
              ],
            },
            {
              model: User,
              as: "createdByUser",
              attributes: ["username"],
            },
            {
              model: User,
              as: "updatedByUser",
              attributes: ["username"],
            },
          ],
        });
      })
    );

    res.json(newCardsWithJoins);
  } catch (error) {
    next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  const { cardIds } = req.body;
  try {
    const deleteStatus = await Promise.all(
      cardIds.map((cardId) => {
        return Card.destroy({
          where: {
            id: cardId,
          },
        });
      })
    );

    res.json({ cardsDeleted: deleteStatus.filter((s) => s === 1).length });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
