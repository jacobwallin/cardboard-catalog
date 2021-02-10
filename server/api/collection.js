const router = require("express").Router();

const { isUser } = require("../middleware");

const { Card, CardData, Series, UserCard } = require("../db/models");

const sequelize = require("sequelize");
const db = require("../db/db");

// collection api routes only available to logged in users
// router.use(isUser);

// get all cards in the user's collection, aggregated by set
router.get("/", async (req, res, next) => {
  try {
    const userId = 1;

    const [results] = await db.query(
      `SELECT sets.id as "setId", sets.name as "setName", sets.description as "setDescription", sets.year as "year", COUNT(cards.id) as "distinctCards", SUM(user_card.quantity) as "totalCards" FROM user_card INNER JOIN cards ON user_card."cardId" = cards.id AND user_card."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id GROUP BY sets.id`
    );

    res.json(results);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get any cards the user has for a specific set, aggregated by subset
router.get("/set/:setId", async (req, res, next) => {
  try {
    const userId = 1;

    const [results] = await db.query(
      `SELECT subsets.id as "subsetId", subsets.name as "subsetName", subsets.description as "subsetDescription", COUNT(cards.id) as "distinctCards", SUM(user_card.quantity) as "totalCards", subsets."setId" as "setId" FROM user_card INNER JOIN cards ON user_card."cardId" = cards.id AND user_card."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id WHERE sets.id = ${req.params.setId} GROUP BY subsets.id `
    );

    const responseData = {
      cardsBySubset: results,
      setId: +req.params.setId,
    };

    res.json(responseData);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get all cards the user has for a specific subset
router.get("/subset/:subsetId", async (req, res, next) => {
  try {
    const cards = await UserCard.findAll({
      where: { userId: 1, "$card->series.subsetId$": req.params.subsetId },
      include: {
        model: Card,
        attributes: ["id", "cardDataId", "seriesId"],
        include: [
          {
            model: Series,
            attributes: ["id", "name", "color", "serializedTo", "subsetId"],
          },
          {
            model: CardData,
            attributes: ["id", "name", "number", "rookie", "teamId"],
          },
        ],
      },
    });

    const responseData = {
      cards: cards,
      subsetId: +req.params.subsetId,
    };

    res.json(responseData);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

// TODO: remove hard coded userId
router.post("/add", async (req, res, next) => {
  const { cardsToAdd } = req.body;
  try {
    // bulk create user card entries
    const userCards = await UserCard.bulkCreate(
      cardsToAdd.map((cardInfo) => {
        return {
          serialNumber: cardInfo.serialNumber,
          grade: cardInfo.grade,
          cardId: cardInfo.cardId,
          gradingCompanyId: cardInfo.gradingCompanyId,
          userId: 1,
        };
      })
    );

    res.status(201).json(userCards);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
