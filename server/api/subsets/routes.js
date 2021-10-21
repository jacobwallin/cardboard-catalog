const router = require("express").Router();

const { isAdmin } = require("../../middleware");

const {
  Subset,
  Series,
  CardData,
  Team,
  Player,
  Card,
  Set,
} = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const subsets = await Subset.findAll();
    res.json(subsets);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get card information for a complete subset (includes every series)
router.get("/:subsetId", async (req, res, next) => {
  try {
    // had to separate out these queries, combining all joins into one was taking over 6 seconds
    const subset = await Subset.findByPk(req.params.subsetId, {
      include: [
        {
          model: Series,
          include: {
            model: Card,
            attributes: ["id", "value", "seriesId", "cardDataId"],
          },
        },
        { model: Set },
      ],
    });

    const subsetCardData = await Subset.findByPk(req.params.subsetId, {
      include: {
        model: CardData,
        include: [
          { model: Team, attributes: ["id", "name"] },
          {
            model: Player,
            attributes: ["id", "name", "birthday", "hallOfFame"],
          },
        ],
      },
    });

    // get raw data from Sequelize model instances so data can be combined
    const subsetObj = subset.get({ plain: true });
    const subsetCardDataObj = subsetCardData.get({ plain: true });

    // add on card data to the subset data object
    subsetObj.card_data = subsetCardDataObj.card_data;

    res.json(subsetObj);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  const { name, description, setId, baseSeriesId } = req.body;
  try {
    // create new subset
    const createdSubset = await Subset.create({
      name,
      description,
      setId,
      baseSeriesId,
    });

    // create initial base series
    let baseSeries = await Series.create({
      name: "Base Set",
      subsetId: createdSubset.id,
    });

    // set base series id and save
    createdSubset.baseSeriesId = baseSeries.id;
    await createdSubset.save();

    res.json(createdSubset);
  } catch (error) {
    next(error);
  }
});

router.put("/:subsetId", isAdmin, async (req, res, next) => {
  const { name, description, baseSeriesId } = req.body;

  try {
    await Subset.update(
      { name, description, baseSeriesId },
      { where: { id: req.params.subsetId } }
    );

    const updatedSubset = await Subset.findByPk(req.params.subsetId);
    res.json(updatedSubset);
  } catch (error) {
    next(error);
  }
});

router.delete("/:subsetId", isAdmin, async (req, res, next) => {
  try {
    // find subset
    const subset = await Subset.findByPk(req.params.subsetId);
    console.log("WTF is this?", subset);

    if (subset) {
      // get set that subset to be deleted belongs to
      const set = await Set.findByPk(subset.setId);

      // if the subset is the set's base subset, susbet cannot be deleted
      if (set.baseSubsetId === subset.id) {
        throw new Error("Cannot delete base subset!");
      }
    }

    const deleteSuccess = await Subset.destroy({
      where: { id: req.params.subsetId },
    });
    res.json(deleteSuccess);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
