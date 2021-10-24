const router = require("express").Router();

const { isAdmin } = require("../../middleware");

const {
  Series,
  Subset,
  Card,
  CardData,
  Player,
  Team,
} = require("../../db/models");

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
      include: [
        {
          model: Card,
          attributes: ["id", "seriesId", "cardDataId"],
          include: {
            model: CardData,
            include: [
              {
                model: Player,
                attributes: [
                  "id",
                  "name",
                  "fullName",
                  "birthday",
                  "hallOfFame",
                ],
              },
              { model: Team },
            ],
          },
        },
        { model: Subset },
      ],
    });
    res.json(series);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  const {
    name,
    color,
    serialized,
    auto,
    relic,
    manufacturedRelic,
    refractor,
    shortPrint,
    subsetId,
  } = req.body;

  try {
    // create new series
    // parallel is automatically set to true as all series are parallels except for base series which is created automatically at subset creation
    const createdSeries = await Series.create({
      name,
      color,
      serialized,
      auto,
      relic,
      manufacturedRelic,
      refractor,
      shortPrint,
      subsetId,
      parallel: true,
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

router.put("/:seriesId", isAdmin, async (req, res, next) => {
  const {
    name,
    color,
    serialized,
    auto,
    relic,
    manufacturedRelic,
    refractor,
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
        refractor,
        shortPrint,
      },
      { where: { id: req.params.seriesId } }
    );

    const updatedSeries = await Series.findByPk(req.params.seriesId, {
      include: Subset,
    });

    res.json(updatedSeries);
  } catch (error) {
    next(error);
  }
});

router.delete("/:seriesId", isAdmin, async (req, res, next) => {
  try {
    // find series
    const series = await Series.findByPk(req.params.seriesId);

    if (series) {
      // get set that subset to be deleted belongs to
      const subset = await Subset.findByPk(series.subsetId);

      // if the subset is the set's base subset, susbet cannot be deleted
      if (subset.baseSeriesId === series.id) {
        throw new Error("Cannot delete base series!");
      }
    }

    const deleteSuccess = await Series.destroy({
      where: { id: req.params.seriesId },
    });
    res.json(deleteSuccess);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
