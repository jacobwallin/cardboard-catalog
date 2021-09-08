const router = require("express").Router();

const { validationResult } = require("express-validator");

const { postSubsetValidate } = require("./validation");

const {
  Subset,
  Series,
  CardData,
  Team,
  Player,
  Card,
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
      include: {
        model: Series,
        include: {
          model: Card,
          attributes: ["id", "value", "seriesId", "cardDataId"],
        },
      },
    });

    const subsetCardData = await Subset.findByPk(req.params.subsetId, {
      include: {
        model: CardData,
        include: [
          { model: Team, attributes: ["id", "name"] },
          {
            model: Player,
            attributes: [
              "id",
              "firstName",
              "lastName",
              "birthday",
              "hallOfFame",
            ],
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
    console.log(error.message);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res, next) => {
  const { name, description, setId } = req.body;
  try {
    const createdSubset = await Subset.create({
      name,
      description,
      setId,
    });
    res.json(createdSubset);
  } catch (error) {
    next(error);
  }
});

router.put("/:subsetId", async (req, res, next) => {
  const { name, description } = req.body;

  try {
    await Subset.update(
      { name, description },
      { where: { id: req.params.subsetId } }
    );

    const updatedSubset = await Subset.findByPk(req.params.subsetId);
    res.json(updatedSubset);
  } catch (error) {
    next(error);
  }
});

router.delete("/:subsetId", async (req, res, next) => {
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
