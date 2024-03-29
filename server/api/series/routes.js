const router = require("express").Router();

const { isAdmin } = require("../../middleware");

const {
  Series,
  Subset,
  Set,
  Card,
  CardData,
  Player,
  Team,
  User,
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
        },
        {
          model: Subset,
          include: Set,
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

    const subsetCardData = await CardData.findAll({
      where: {
        subsetId: series.subsetId,
      },
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
    });
    res.json({ series, subsetCardData });
  } catch (error) {
    next(error);
  }
});

// *** ADMIN ROUTES ***

router.post("/", isAdmin, async (req, res, next) => {
  const { name, color, serialized, refractor, subsetId } = req.body;

  try {
    // create new series
    // parallel is automatically set to true as all series are parallels except for base series which is created automatically at subset creation
    const createdSeries = await Series.create({
      name,
      color,
      serialized,
      refractor,
      subsetId,
      parallel: true,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });

    // get the parent subset with associated card data
    const parentSubset = await Subset.findByPk(subsetId, { include: CardData });

    // create a new card for each card data associated with the subset
    await Promise.all(
      parentSubset.card_data.map((data) => {
        return Card.create({
          seriesId: createdSeries.id,
          cardDataId: data.id,
          createdBy: req.user.id,
          updatedBy: req.user.id,
        });
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
  const { name, color, serialized, refractor } = req.body;
  try {
    await Series.update(
      {
        name,
        color,
        serialized,
        refractor,
        updatedAt: req.user.id,
      },
      { where: { id: req.params.seriesId } }
    );

    const updatedSeries = await Series.findByPk(req.params.seriesId, {
      include: [
        Subset,
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

      // if the subset is the set's base subset, subset cannot be deleted
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
