const router = require("express").Router();
const { Op } = require("sequelize");

const { isUser } = require("../middleware");

const {
  Card,
  CardData,
  UserCard,
  GradingCompany,
  Player,
  Series,
  Subset,
  Set,
  Team,
} = require("../db/models");

const db = require("../db/db");

// collection api routes only available to logged in users
router.use(isUser);

router.get("/", async (req, res, next) => {
  try {
    const userId = req.user.id;

    // this query aggregates all cards in the user's collection by set, counting the amount of distinct cards and total cards per set
    const [results] = await db.query(
      `SELECT sets.id as "setId", sets.name as "setName", sets.description as "setDescription", sets.release_date as "release_date", COUNT( DISTINCT cards.id) as "distinctCards", COUNT(user_card.id) as "totalCards" FROM user_card INNER JOIN cards ON user_card."cardId" = cards.id AND user_card."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id GROUP BY sets.id`
    );

    res.json(results);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get any cards the user has for a specific set, aggregated by subset
router.get("/set/:setId", async (req, res, next) => {
  try {
    const userId = req.user.id;

    // this query aggregates all cards by subset, filtering by the setId and counting the amount of distinct cards and total cards per subset
    const [results] = await db.query(
      `SELECT subsets.id as "subsetId", subsets.name as "subsetName", subsets.description as "subsetDescription", COUNT(DISTINCT cards.id) as "distinctCards", COUNT(user_card.id) as "totalCards", subsets."setId" as "setId" FROM user_card INNER JOIN cards ON user_card."cardId" = cards.id AND user_card."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id WHERE sets.id = ${req.params.setId} GROUP BY subsets.id `
    );

    res.json(results);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/subset/:subsetId", async (req, res, next) => {
  const userId = req.user.id;
  // get all cards the user has for a specific subset
  try {
    const cards = await UserCard.findAll({
      where: {
        userId: userId,
        "$card->card_datum.subsetId$": req.params.subsetId,
      },
      include: [
        {
          model: Card,
          attributes: [],
          include: {
            model: CardData,
          },
        },
      ],
    });

    res.json(cards);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

router.post("/add", async (req, res, next) => {
  const { cardsToAdd } = req.body;
  const userId = req.user.id;
  try {
    // bulk create user card entries
    const userCards = await UserCard.bulkCreate(
      cardsToAdd.map((cardInfo) => {
        return {
          serialNumber: cardInfo.serialNumber,
          grade: cardInfo.grade,
          cardId: cardInfo.cardId,
          gradingCompanyId: cardInfo.gradingCompanyId,
          userId: userId,
        };
      })
    );

    res.status(201).json(userCards);
  } catch (error) {
    next(error);
  }
});

router.post("/delete/bulk", async (req, res, next) => {
  const { userCardIds } = req.body;

  try {
    const deleteTotals = await Promise.all(
      userCardIds.map((id) => {
        return UserCard.destroy({
          where: {
            id: id,
          },
        });
      })
    );
    // return total number of deleted instances
    res.json(deleteTotals.length);
  } catch (error) {
    next(error);
  }
});

router.get("/filter", async (req, res, next) => {
  // sort by card name
  // let playerSort = [Card, CardData, "name", "ASC"];

  // let cardIdFilter = {
  //   "$card.id$": { [Op.eq]: 18512 },
  // };

  // let playerFilter = {
  //   "$card.card_datum.players.id$": { [Op.eq]: 90 },
  // };

  try {
    const userCards = await UserCard.findAndCountAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Card,
          attributes: ["id", "value", "seriesId", "cardDataId"],
          include: [
            {
              model: CardData,
              attributes: [
                "id",
                "name",
                "number",
                "rookie",
                "subsetId",
                "teamId",
              ],
              include: [
                {
                  model: Player,
                  attributes: ["id", "name", "birthday", "hallOfFame"],
                },
                {
                  model: Team,
                  attributes: ["name"],
                },
              ],
            },
            {
              model: Series,
              include: {
                model: Subset,
                attributes: ["id", "name", "baseSeriesId", "setId"],
                include: {
                  model: Set,
                  attributes: [
                    "id",
                    "name",
                    "baseSubsetId",
                    "release_date",
                    "leagueId",
                    "brandId",
                  ],
                },
              },
            },
          ],
        },
        GradingCompany,
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(userCards);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
