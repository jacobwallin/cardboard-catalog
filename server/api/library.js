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

const sequelize = require("sequelize");

// library api routes only available to logged in users who are administrators
// router.use(isUser);

router.get("/", async (req, res) => {
  try {
    const allSets = await Set.findAll({
      attributes: ["id", "name", "year"],
      order: [
        ["year", "ASC"],
        ["name", "ASC"],
        [Subset, "id", "ASC"],
      ],
      include: [
        { model: Brand, attributes: ["id", "name"] },
        { model: League, attributes: ["id", "name"] },
        {
          model: Subset,

          attributes: ["id", "name", "cardQuantity", "setId"],
        },
      ],
    });

    res.json(allSets);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

// get card information for a complete subset (includes every series)
router.get("/subsets/:subsetId", async (req, res, next) => {
  try {
    const subset = await Subset.findByPk(req.params.subsetId, {
      include: {
        model: Series,
        attributes: ["id", "name", "color", "serializedTo"],
        include: [
          {
            model: Attribute,
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
    });

    res.json(subset);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
