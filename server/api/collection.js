const router = require("express").Router();

const { isUser } = require("../middleware");

const {
  Card,
  CardData,
  UserCard,
  Player,
  Team,
  GradingCompany,
} = require("../db/models");

const db = require("../db/db");

// collection api routes only available to logged in users
// router.use(isUser);

router.get("/", async (req, res, next) => {
  try {
    const userId = 1;

    // this query aggregates all cards in the user's collection by set, counting the amount of distinct cards and total cards per set
    const [results] = await db.query(
      `SELECT sets.id as "setId", sets.name as "setName", sets.description as "setDescription", sets.year as "year", COUNT( DISTINCT cards.id) as "distinctCards", COUNT(user_card.id) as "totalCards" FROM user_card INNER JOIN cards ON user_card."cardId" = cards.id AND user_card."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id GROUP BY sets.id`
    );

    res.json(results);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get any cards the user has for a specific set, aggregated by subset
router.get("/set/:setId", async (req, res, next) => {
  try {
    //TODO: remove hard coded userId
    const userId = 1;

    // this query aggregates all cards by subset, filtering by the setId and counting the amount of distinct cards and total cards per subset
    const [results] = await db.query(
      `SELECT subsets.id as "subsetId", subsets.name as "subsetName", subsets.description as "subsetDescription", COUNT(DISTINCT cards.id) as "distinctCards", COUNT(user_card.id) as "totalCards", subsets."setId" as "setId" FROM user_card INNER JOIN cards ON user_card."cardId" = cards.id AND user_card."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id WHERE sets.id = ${req.params.setId} GROUP BY subsets.id `
    );

    res.json(results);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get all cards the user has for a specific subset
router.get("/subset/:subsetId", async (req, res, next) => {
  try {
    const cards = await UserCard.findAll({
      where: { userId: 1, "$card->card_datum.subsetId$": req.params.subsetId },
      include: [
        { model: GradingCompany, attributes: ["name"] },
        {
          model: Card,

          include: {
            model: CardData,
            include: [
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
              { model: Team, attributes: ["id", "name"] },
            ],
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
