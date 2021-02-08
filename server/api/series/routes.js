const router = require("express").Router();

const { Series, Subset, Card, CardData } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allSeries = await Series.findAll();
    res.json(allSeries);
  } catch (error) {
    next(error);
  }
});

router.get("/:seriesId", async (req, res, next) => {
  try {
    const series = await Series.findByPk(req.params.seriesId, {
      include: {
        model: Card,
        attributes: ["id", "seriesId", "cardDataId"],
        include: {
          model: CardData,
          attributes: [
            "id",
            "name",
            "number",
            "rookie",
            "playerId",
            "subsetId",
            "teamId",
          ],
        },
      },
    });
    res.json(series);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const {
    name,
    color,
    serialized,
    auto,
    relic,
    manufacturedRelic,
    parallel,
    shortPrint,
    subsetId,
  } = req.body;

  try {
    // create new series
    const createdSeries = await Series.create({
      name,
      color,
      serialized,
      auto,
      relic,
      manufacturedRelic,
      parallel,
      shortPrint,
      subsetId,
    });

    // get the parent subset with associated card data
    const parentSubset = await Subset.findByPk(subsetId, { include: CardData });

    // create a new card for each card data associated with the subset
    await Promise.all(
      parentSubset.card_data.map((data) => {
        return Card.create({ seriesId: createdSeries.id, cardDataId: data.id });
      })
    );

    // query for new series with card join
    const createdSeriesWithCards = await Series.findByPk(createdSeries.id, {
      include: Card,
    });

    // return the created series
    res.json(createdSeriesWithCards);
  } catch (error) {
    next(error);
  }
});

router.put("/:seriesId", async (req, res, next) => {
  const {
    name,
    color,
    serialized,
    auto,
    relic,
    manufacturedRelic,
    parallel,
    shortPrint,
  } = req.body;
  try {
    await Series.update(
      {
        name,
        color,
        serialized,
        auto,
        relic,
        manufacturedRelic,
        parallel,
        shortPrint,
      },
      { where: { id: req.params.seriesId } }
    );

    const updatedSeries = await Series.findByPk(req.params.seriesId);

    res.json(updatedSeries);
  } catch (error) {
    next(error);
  }
});

router.delete("/:seriesId", async (req, res, next) => {
  try {
    const deleteSuccess = await Series.destroy({
      where: { id: req.params.seriesId },
    });
    res.json(deleteSuccess);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
