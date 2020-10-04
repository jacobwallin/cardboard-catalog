const router = require("express").Router();

const { isUser } = require("../middleware");

const {
  Card,
  CardData,
  Set,
  Subset,
  Series,
  Team,
  League,
  Brand,
  Attribute,
} = require("../db/models");

// library api routes only available to logged in users who are administrators
// router.use(isUser);

// get a summary of all sets in the library
router.get("/", async (req, res) => {
  try {
    const allSets = await Set.findAll({
      attributes: ["id", "name", "year"],
      order: [
        ["year", "ASC"],
        ["name", "ASC"],
      ],
      include: [
        { model: Brand, attributes: ["id", "name"] },
        { model: League, attributes: ["id", "name"] },
      ],
    });

    res.json(allSets);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

// get data for a single set from the library
router.get("/set/:setId", async (req, res, next) => {
  try {
    const setData = await Set.findByPk(req.params.setId, {
      attributes: [
        "id",
        "name",
        "year",
        "description",
        "createdAt",
        "updatedAt",
      ],
      include: [
        { model: League, attributes: ["id", "name"] },
        { model: Brand, attributes: ["id", "name"] },
        {
          model: Subset,
          attributes: ["id", "name", "cardQuantity", "description", "setId"],
        },
      ],
    });

    res.json(setData);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get card information for a complete subset (includes every series)
router.get("/subset/:subsetId", async (req, res, next) => {
  try {
    const subset = await Subset.findByPk(req.params.subsetId, {
      include: [
        {
          model: Series,
          attributes: ["id", "name", "color", "serializedTo"],
          include: [
            {
              model: Attribute,
              attributes: ["id", "name"],
            },
            {
              model: Card,
              attributes: ["id"],
              include: {
                model: CardData,
                attributes: ["name", "number", "rookie"],
                include: {
                  model: Team,
                  attributes: ["name"],
                },
              },
            },
          ],
        },
      ],
    });

    res.json(subset);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
