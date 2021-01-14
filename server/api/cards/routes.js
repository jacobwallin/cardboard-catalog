const router = require("express").Router();

const { Card, CardData, Series, Team } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.findAll();
    res.json(allCards);
  } catch (error) {
    next(error);
  }
});

router.get("/:cardId", async (req, res, next) => {
  try {
    const card = await Card.findByPk(req.params.cardId, {
      include: [{ model: CardData, include: Team }, { model: Series }],
    });
    res.json(card);
  } catch (error) {
    next(error);
  }
});

// post route only creates the card data row, to add information to the card that must be done through put route
router.post("/", async (req, res, next) => {
  // create card data and then create a card for every series in set
  const { name, number, rookie, teamId, subsetId } = req.body;

  try {
    // create new card data entry
    const newCardData = await CardData.create({
      name,
      number,
      rookie,
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
  } catch (error) {}
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
  const { name, number, rookie, teamId, subsetId } = req.body;

  try {
    const updatedCardData = await CardData.update(
      { name, number, rookie, teamId, subsetId },
      { where: { id: req.params.cardId } }
    );

    res.json(updatedCardData);
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
