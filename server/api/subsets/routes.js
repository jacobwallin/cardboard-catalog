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
  User,
  League,
  Brand,
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
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "createdBy",
                "updatedBy",
                "value",
                "seriesId",
              ],
            },
          },
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
        {
          model: Set,
          attributes: { exclude: ["description"] },
          include: [League, Brand],
        },
      ],
    });

    const subsetCardData = await Subset.findByPk(req.params.subsetId, {
      include: {
        model: CardData,
        include: [
          {
            model: Team,
            attributes: {
              exclude: ["createdAt", "updatedAt", "createdBy", "updatedBy"],
            },
          },
          {
            model: Player,
            attributes: { exclude: ["createdAt", "updatedAt"] },
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
    });

    // get raw data from Sequelize model instances so data can be combined
    const subsetObj = subset.get({ plain: true });
    const subsetCardDataObj = subsetCardData.get({ plain: true });

    // add on card data to the subset data object
    subsetObj.card_data = subsetCardDataObj.card_data;

    res.json(subsetObj);
  } catch (error) {
    next(error);
  }
});

// *** ADMIN ROUTES ***

router.post("/", isAdmin, async (req, res, next) => {
  const {
    name,
    description,
    setId,
    prefix,
    code,
    base,
    auto,
    relic,
    manufacturedRelic,
    shortPrint,
  } = req.body;
  try {
    // create new subset
    const createdSubset = await Subset.create({
      name,
      description,
      setId,
      prefix,
      code,
      base,
      auto,
      relic,
      manufacturedRelic,
      shortPrint,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });

    // create initial base series
    let baseSeries = await Series.create({
      name: "Base Set",
      subsetId: createdSubset.id,
      createdBy: req.user.id,
      updatedBy: req.user.id,
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
  const {
    name,
    description,
    prefix,
    code,
    base,
    auto,
    relic,
    manufacturedRelic,
    shortPrint,
  } = req.body;

  try {
    await Subset.update(
      {
        name,
        description,
        prefix,
        code,
        base,
        auto,
        relic,
        manufacturedRelic,
        shortPrint,
        updatedBy: req.user.id,
      },
      { where: { id: req.params.subsetId } }
    );

    const updatedSubset = await Subset.findByPk(req.params.subsetId, {
      include: [
        {
          model: User,
          as: "updatedByUser",
          attributes: ["username"],
        },
        {
          model: User,
          as: "createdByUser",
          attributes: ["username"],
        },
      ],
    });
    res.json(updatedSubset);
  } catch (error) {
    next(error);
  }
});

router.delete("/:subsetId", isAdmin, async (req, res, next) => {
  try {
    const deleteSuccess = await Subset.destroy({
      where: { id: req.params.subsetId },
    });
    res.json(deleteSuccess);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
