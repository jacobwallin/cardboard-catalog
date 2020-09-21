const router = require("express").Router();

const { isUser } = require("../middleware");

const {
  Card,
  CardData,
  Subset,
  Series,
  Team,
  Attribute,
} = require("../db/models");

const sequelize = require("sequelize");

// library api routes only available to logged in users who are administrators
// router.use(isUser);

router.get("/", (req, res) => {
  res.send("you have reached the LIBRARY api route");
});

// get card information for a complete subset (includes every series)
router.get("/subsets/:subsetId", async (req, res, next) => {
  try {
    const subset = await Subset.findByPk(req.params.subsetId, {
      include: {
        model: Series,
        attributes: ["id", "name", "serializedTo"],
        include: {
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
      },
    });

    res.json(subset);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
