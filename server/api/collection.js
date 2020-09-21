const router = require("express").Router();

const { isUser } = require("../middleware");

const {
  Card,
  CardData,
  Set,
  Subset,
  Series,
  Team,
  Attribute,
  User,
  UserCardJoin,
} = require("../db/models");

const sequelize = require("sequelize");
const db = require("../db/db");

// collection api routes only available to logged in users
// router.use(isUser);

router.get("/", async (req, res, next) => {
  try {
    const userId = 1;

    const [results] = await db.query(
      `SELECT subsets.id as "subsetId", subsets.name as "subsetName", COUNT(cards.id) as "distinctCards", SUM(user_card_join.quantity) as "totalCards", MAX(sets.id) as "setId", MAX(sets.year) as "setYear", MAX(sets.name) as "setName" FROM user_card_join INNER JOIN cards ON user_card_join."cardId" = cards.id AND user_card_join."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id GROUP BY subsets.id`
    );

    res.json(results);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/:subsetId", async (req, res, next) => {
  try {
    const cards = await UserCardJoin.findAll({
      where: { userId: 1, "$card->series.subsetId$": 1 },
      include: {
        model: Card,
        attributes: ["id", "seriesId"],
        include: {
          model: Series,
        },
      },
    });

    res.json(cards);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

router.post("/add", async (req, res) => {
  const { cardId, quantity, serialNumber } = req.body;

  console.log("SERIAL NUMBER:", serialNumber);

  try {
    let [userCard, created] = await UserCardJoin.findOrCreate({
      where: { cardId: cardId, userId: 1 },
      defaults: {
        quantity: quantity,
        serialNumber: serialNumber,
      },
    });

    if (!created) {
      await userCard.update({
        quantity: userCard.quantity + quantity,
        serialNumber: serialNumber !== undefined ? serialNumber : null,
      });
    }

    const idk = await userCard.getCard({
      include: {
        model: CardData,
        attributes: ["name", "number", "rookie"],
      },
      attributes: ["id"],
    });

    res.send(idk);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
