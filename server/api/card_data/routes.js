const router = require("express").Router();

const { isAdmin } = require("../../middleware");

const { Card, CardData, Team, Player, Series } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allCardData = await CardData.findAll();
    res.json(allCardData);
  } catch (error) {
    next(error);
  }
});

router.post("/scrape", async (req, res, next) => {
  const { url } = req.body;

  // validate url
  const valid = /^https?:\/\/www.tcdb.com\/Checklist.cfm\/sid/.test(url);

  if (valid) {
    try {
      const cardData = await require("./scrape")(url);
      res.json(cardData);
    } catch (error) {}
  } else {
    next(new Error("Invalid URL"));
  }
});

router.get("/:cardDataId", async (req, res, next) => {
  try {
    const cardData = await CardData.findByPk(req.params.cardDataId, {
      include: [{ model: Player }, { model: Team }],
    });
    res.json(cardData);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  // create card data and then create a card for every series in set
  const { name, number, rookie, note, playerIds, teamId, subsetId } = req.body;

  try {
    // find players by pk and validate before continuing
    const players = await Promise.all(
      playerIds.map((id) => {
        return Player.findByPk(id);
      })
    );

    // if all player ids are valid, continue, otherwise throw an error
    if (!players.some((player) => player === null)) {
      // create new card data entry
      const newCardData = await CardData.create({
        name,
        number,
        rookie,
        note,
        teamId,
        subsetId,
      });
      // add the players to the card data entry
      await newCardData.addPlayers(players);

      const cardDataWithJoins = await CardData.findByPk(newCardData.id, {
        include: [Team, Player],
      });

      // get all series that are part of the subset
      const allSeries = await Series.findAll({ where: { subsetId: subsetId } });

      // create a card for each series
      await Promise.all(
        allSeries.map((series) => {
          return Card.create({
            seriesId: series.id,
            cardDataId: newCardData.id,
          });
        })
      );

      // send back new created card
      res.status(201).json(cardDataWithJoins);
    } else {
      throw new Error("Invalid Player id(s)");
    }
  } catch (error) {
    next(error);
  }
});

// bulk add cards to a subset
router.post("/bulk", async (req, res, next) => {
  const { cards } = req.body;
  try {
    const createdCards = await Promise.all(
      cards.map(async (card) => {
        const { name, number, rookie, note, playerIds, teamId, subsetId } =
          card;

        // find players by pk and validate before continuing
        const players = await Promise.all(
          playerIds.map((id) => {
            return Player.findByPk(id);
          })
        );

        // if all player ids are valid, continue, otherwise throw an error
        if (!players.some((player) => player === null)) {
          // create new card data entry
          const newCardData = await CardData.create({
            name,
            number,
            rookie,
            note,
            teamId,
            subsetId,
          });
          // add the players to the card data entry
          await newCardData.addPlayers(players);

          // get all series that are part of the subset
          const allSeries = await Series.findAll({
            where: { subsetId: subsetId },
          });

          // create a card for each series
          await Promise.all(
            allSeries.map((series) => {
              return Card.create({
                seriesId: series.id,
                cardDataId: newCardData.id,
              });
            })
          );

          return CardData.findByPk(newCardData.id, {
            include: [Team, Player],
          });
        } else {
          throw new Error("Invalid Player id(s)");
        }
      })
    );

    res.json(createdCards);
  } catch (error) {
    next(error);
  }
});

router.put("/:cardId", isAdmin, async (req, res, next) => {
  const { name, number, rookie, playerIds, teamId, note } = req.body;

  try {
    // get card data instance
    const cardData = await CardData.findByPk(req.params.cardId, {
      include: [Team, Player],
    });
    // update values locally
    cardData.name = name;
    cardData.number = number;
    cardData.rookie = rookie;
    cardData.teamId = teamId;
    cardData.note = note;
    // save new values to db
    await cardData.save();

    // get all players
    const currentPlayers = await cardData.getPlayers();
    // remove all
    await cardData.removePlayers(currentPlayers);
    // re-add
    await cardData.addPlayers(playerIds);
    // reload to get new players
    await cardData.reload();

    res.json(cardData);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cardId", isAdmin, async (req, res, next) => {
  // delete card data entry (delete will cascade and delete cards that belong the the card data)
  const deleteStatus = await CardData.destroy({
    where: { id: req.params.cardId },
  });

  res.json(deleteStatus);
});

module.exports = router;
