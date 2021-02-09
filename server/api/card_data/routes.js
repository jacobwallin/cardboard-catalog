const router = require("express").Router();

const { Card, CardData, Team, Player, Series } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allCardData = await CardData.findAll();
    res.json(allCardData);
  } catch (error) {
    next(error);
  }
});

router.get("/:cardDataId", async (req, res, next) => {
  try {
    const cardData = await CardData.findByPk(req.params.cardDataId, {
      include: [{ model: Player }, { model: Team }],
    });
    res.json(cardData);
  } catch (error) {
    next(error);
  }
});

// creates a new card data entry, along with a card entry for each series that belongs to the subset
router.post("/", async (req, res, next) => {
  // create card data and then create a card for every series in set
  const { name, number, rookie, playerId, teamId, subsetId } = req.body;

  try {
    // create new card data entry
    const newCardData = await CardData.create({
      name,
      number,
      rookie,
      playerId,
      teamId,
      subsetId,
    });

    // get all series that are part of the subset
    const allSeries = await Series.findAll({ where: { subsetId: subsetId } });

    // create a card for each series
    await Promise.all(
      allSeries.map((series) => {
        return Card.create({ seriesId: series.id, cardDataId: newCardData.id });
      })
    );

    // send back new created card
    res.status(201).json(newCardData);
  } catch (error) {
    next(error);
  }
});

// bulk add cards to a subset
router.post("/bulk", async (req, res, next) => {
  const { cards, subsetId } = req.body;

  try {
    // create new card data entries
    const newCardData = await Promise.all(
      cards.map((cardData) =>
        CardData.create({
          name: cardData.name,
          number: cardData.number,
          rookie: cardData.rookie,
          playerId: cardData.playerId,
          teamId: cardData.teamId,
          subsetId,
        })
      )
    );

    // get all series that are part of the subset
    const allSeries = await Series.findAll({ where: { subsetId: subsetId } });

    // create a card for each series
    await Promise.all(
      allSeries.map((series) => {
        return Promise.all(
          newCardData.map((cardData) => {
            return Card.create({
              seriesId: series.id,
              cardDataId: cardData.id,
            });
          })
        );
      })
    );

    res.status(201).json(newCardData);
  } catch (error) {
    next(error);
  }
});

router.put("/:cardId", async (req, res, next) => {
  const { name, number, rookie, playerId, teamId } = req.body;

  try {
    await CardData.update(
      { name, number, rookie, playerId, teamId },
      { where: { id: req.params.cardId } }
    );

    const updatedCard = await CardData.findByPk(req.params.cardId, {
      include: Team,
    });

    res.json(updatedCard);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cardId", async (req, res, next) => {
  // delete card data entry (delete will cascade and delete cards that belong the the card data)
  const deleteStatus = await CardData.destroy({
    where: { id: req.params.cardId },
  });

  res.json(deleteStatus);
});

module.exports = router;
