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
  CardDataPlayer,
} = require("../db/models");

const db = require("../db/db");

// collection api routes only available to logged in users
router.use(isUser);

router.get("/", async (req, res, next) => {
  try {
    const userId = req.user.id;

    // this query aggregates all cards in the user's collection by set, counting the amount of distinct cards and total cards per set
    const [results] = await db.query(
      `SELECT sets.id as "setId", sets.name as "setName", sets.description as "setDescription", sets.release_date as "release_date", sets.year as "year", COUNT( DISTINCT cards.id) as "distinctCards", COUNT(user_card.id) as "totalCards" FROM user_card INNER JOIN cards ON user_card."cardId" = cards.id AND user_card."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id GROUP BY sets.id`
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
  // let playerSort = [Card, CardData, "number", "ASC"];

  const cardDataInclude = [
    {
      model: Team,
      attributes: ["name"],
    },
  ];

  const queryParams = req.query;
  const filters = {};
  // remove pagination params
  let filterNames = Object.keys(queryParams).filter(
    (query) => query !== "limit" && query !== "offset"
  );

  // create filter object
  for (let i = 0; i < filterNames.length; i++) {
    switch (filterNames[i]) {
      case "rookie":
        let rookie = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.card_datum.rookie$"] = { [Op.eq]: rookie };
        break;
      case "parallel":
        let parallel = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.parallel$"] = { [Op.eq]: parallel };
        break;
      case "serialized":
        let serialized = queryParams[filterNames[i]] === "true" ? true : false;
        if (serialized) {
          filters["$card.series.serialized$"] = { [Op.ne]: null };
        } else {
          filters["$card.series.serialized$"] = { [Op.eq]: null };
        }
        break;
      case "auto":
        let auto = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.auto$"] = { [Op.eq]: auto };
        break;
      case "relic":
        let relic = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.relic$"] = { [Op.eq]: relic };
        break;
      case "refractor":
        let refractor = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.refractor$"] = { [Op.eq]: refractor };
        break;
      case "short-print":
        let shortPrint = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.shortPrint$"] = { [Op.eq]: shortPrint };
        break;
      case "man-relic":
        let manufacturedRelic =
          queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.manufacturedRelic$"] = {
          [Op.eq]: manufacturedRelic,
        };
        break;
      case "hof":
        let hallOfFame = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.manufacturedRelic$"] = {
          [Op.eq]: hallOfFame,
        };
        break;
      case "playerId":
        // only filter if valid number was given
        if (!isNaN(+queryParams[filterNames[i]])) {
          // include players in query
          cardDataInclude.push({
            model: Player,
            attributes: [],
          });
          // add player id filter
          filters["$card.card_datum.players.id$"] = {
            [Op.eq]: +queryParams[filterNames[i]],
          };
        }
        break;
      case "teamId":
        if (!isNaN(+queryParams[filterNames[i]])) {
          filters["$card.card_datum.teamId$"] = {
            [Op.eq]: +queryParams[filterNames[i]],
          };
        }
        break;
      case "year":
        if (!isNaN(+queryParams[filterNames[i]])) {
          filters["$card.series.subset.set.year$"] = {
            [Op.eq]: +queryParams[filterNames[i]],
          };
        }
        break;
      case "setId":
        if (!isNaN(+queryParams[filterNames[i]])) {
          filters["$card.series.subset.set.id$"] = {
            [Op.eq]: +queryParams[filterNames[i]],
          };
        }
        break;
      case "subsetId":
        if (!isNaN(+queryParams[filterNames[i]])) {
          filters["$card.series.subset.id$"] = {
            [Op.eq]: +queryParams[filterNames[i]],
          };
        }
        break;
      case "seriesId":
        if (!isNaN(+queryParams[filterNames[i]])) {
          filters["$card.series.id$"] = {
            [Op.eq]: +queryParams[filterNames[i]],
          };
        }
        break;
      default:
        break;
    }
  }

  try {
    const userCards = await UserCard.findAndCountAll({
      // filters
      where: {
        userId: req.user.id,
        ...filters,
      },
      // pagination
      limit: req.query.limit,
      offset: req.query.offset,
      subQuery: false,
      // sorting
      order: [
        [Card, Series, Subset, Set, "name", "ASC"],
        [Card, Series, Subset, "name", "ASC"],
        [Card, Series, "name", "ASC"],
      ],
      // joins
      include: [
        {
          model: Card,
          attributes: {
            exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
          },
          include: [
            {
              model: CardData,
              attributes: {
                exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
              },
              include: cardDataInclude,
            },
            {
              model: Series,
              attributes: {
                exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
              },
              include: {
                model: Subset,
                attributes: {
                  exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
                },
                include: {
                  model: Set,
                  attributes: {
                    exclude: [
                      "createdAt",
                      "updatedAt",
                      "updatedBy",
                      "createdBy",
                    ],
                  },
                },
              },
            },
          ],
        },
        GradingCompany,
      ],
    });
    res.json(userCards);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
