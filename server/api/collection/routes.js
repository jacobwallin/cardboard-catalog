const router = require("express").Router();
const { Op } = require("sequelize");

const { isUser } = require("../../middleware");

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
  Friend,
} = require("../../db/models");

const db = require("../../db/db");
const e = require("express");

// collection api routes only available to logged in users
router.use(isUser);

// middleware to verify friendship exists when user is viewing a friend's collection
const verifyFriendship = async (req, res, next) => {
  const { uid } = req.query;
  if (uid) {
    try {
      const existingFriendship = await Friend.findOne({
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ user_one_id: req.user.id }, { user_two_id: uid }],
            },
            {
              [Op.and]: [{ user_one_id: uid }, { user_two_id: req.user.id }],
            },
          ],
        },
      });

      if (!existingFriendship) {
        let err = new Error(
          "you do not have permission to view this collection"
        );
        err.status = 401;
        throw err;
      }
    } catch (error) {
      next(error);
    }
  }
  next();
};

router.get("/", verifyFriendship, async (req, res, next) => {
  try {
    const userId = req.query.friendId || req.user.id;

    // this query aggregates all cards in the user's collection by set, counting the amount of distinct cards and total cards per set
    const [results] = await db.query(
      `SELECT sets.id as "setId", sets.name as "setName", sets.year as "year", sets."leagueId", COUNT( DISTINCT cards.id) as "distinctCards", COUNT(user_card.id) as "totalCards" FROM user_card INNER JOIN cards ON user_card."cardId" = cards.id AND user_card."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id where user_card."deletedAt" IS NULL GROUP BY sets.id`
    );

    res.json(results);
  } catch (error) {
    next(error);
  }
});

// get any cards the user has for a specific set, aggregated by subset
router.get("/set/:setId", verifyFriendship, async (req, res, next) => {
  try {
    const userId = req.query.friendId || req.user.id;

    // this query aggregates all cards by subset, filtering by the setId and counting the amount of distinct cards and total cards per subset
    const [results] = await db.query(
      `SELECT subsets.id as "subsetId", subsets.name as "subsetName", subsets.description as "subsetDescription", COUNT(DISTINCT cards.id) as "distinctCards", COUNT(user_card.id) as "totalCards", subsets."prefix" as "prefix", subsets."setId" as "setId" FROM user_card INNER JOIN cards ON user_card."cardId" = cards.id AND user_card."userId" = ${userId} INNER JOIN series ON cards."seriesId" = series.id INNER JOIN subsets ON series."subsetId" = subsets.id INNER JOIN sets ON subsets."setId" = sets.id WHERE sets.id = ${req.params.setId} AND user_card."deletedAt" IS NULL GROUP BY subsets.id `
    );

    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.get("/subset/:subsetId", verifyFriendship, async (req, res, next) => {
  const userId = req.query.friendId || req.user.id;
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
          attributes: {
            exclude: ["createdAt", "updatedAt", "createdBy", "updatedBy"],
          },
          include: {
            attributes: [],
            model: CardData,
          },
        },
      ],
    });

    res.json(cards);
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
            userId: req.user.id,
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

router.get("/filter", verifyFriendship, async (req, res, next) => {
  const userId = req.query.friendId || req.user.id;

  const cardDataInclude = [
    {
      model: Team,
      attributes: ["id", "name", "leagueId"],
    },
  ];

  const queryParams = req.query;

  // determine sort order
  let sortOrder = [];
  if (queryParams.sort) {
    switch (queryParams.sort) {
      case "set":
        if (queryParams.sort_direction === "desc") {
          sortOrder = [
            [Card, Series, Subset, Set, "name", "DESC"],
            [Card, Series, Subset, "name", "DESC"],
            [Card, Series, "name", "DESC"],
          ];
        } else {
          sortOrder = [
            [Card, Series, Subset, Set, "name", "ASC"],
            [Card, Series, Subset, "name", "ASC"],
            [Card, Series, "name", "ASC"],
          ];
        }
        break;
      case "name":
        if (queryParams.sort_direction === "desc") {
          sortOrder = [[Card, CardData, "name", "DESC"]];
        } else {
          sortOrder = [[Card, CardData, "name", "ASC"]];
        }
        break;
      case "number":
        if (queryParams.sort_direction === "asc") {
          sortOrder = [[Card, CardData, "number", "ASC"]];
        } else {
          sortOrder = [[Card, CardData, "number", "DESC"]];
        }
        break;
      case "date":
        if (queryParams.sort_direction === "desc") {
          sortOrder = [["createdAt", "DESC"]];
        } else {
          sortOrder = [["createdAt", "ASC"]];
        }
        break;
      default:
        sortOrder = [["createdAt", "DESC"]];
    }
  } else {
    sortOrder = [["createdAt", "DESC"]];
  }

  // remove pagination and sorting params
  let filterNames = Object.keys(queryParams).filter(
    (query) =>
      query !== "limit" &&
      query !== "offset" &&
      query !== "sort" &&
      query !== "sort_direction"
  );

  // create filter object
  const filters = {};
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
        filters["$card.series.subset.auto$"] = { [Op.eq]: auto };
        break;
      case "relic":
        let relic = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.subset.relic$"] = { [Op.eq]: relic };
        break;
      case "refractor":
        let refractor = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.refractor$"] = { [Op.eq]: refractor };
        break;
      case "short-print":
        let shortPrint = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.subset.shortPrint$"] = { [Op.eq]: shortPrint };
        break;
      case "man-relic":
        let manufacturedRelic =
          queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.series.subset.manufacturedRelic$"] = {
          [Op.eq]: manufacturedRelic,
        };
        break;
      case "hof":
        cardDataInclude.push({
          model: Player,
          through: {
            attributes: [],
          },
          attributes: [],
        });
        let hallOfFame = queryParams[filterNames[i]] === "true" ? true : false;
        filters["$card.card_datum.players.hallOfFame$"] = {
          [Op.eq]: hallOfFame,
        };
        break;
      case "graded":
        let graded = queryParams[filterNames[i]] === "true" ? true : false;
        if (graded) {
          filters["grade"] = { [Op.ne]: null };
        } else {
          filters["grade"] = { [Op.eq]: null };
        }
        break;
      case "playerId":
        // only filter if valid number was given
        if (!isNaN(+queryParams[filterNames[i]])) {
          // include players in query
          cardDataInclude.push({
            model: Player,
            through: {
              attributes: [],
            },
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
      case "sportId":
        if (!isNaN(+queryParams[filterNames[i]])) {
          filters["$card.series.subset.set.leagueId$"] = {
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
        userId: userId,
        ...filters,
      },
      // pagination
      limit: req.query.limit,
      offset: req.query.offset,
      subQuery: false,
      distinct: true,
      // sorting
      order: sortOrder,
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
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "updatedBy",
                    "createdBy",
                    "description",
                  ],
                },
                include: {
                  model: Set,
                  attributes: {
                    exclude: [
                      "createdAt",
                      "updatedAt",
                      "updatedBy",
                      "createdBy",
                      "release_date",
                      "description",
                      "complete",
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
