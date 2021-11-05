const router = require("express").Router();

const { isAdmin } = require("../../middleware");

const { Player } = require("../../db/models");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const allPlayers = await Player.findAll();
    res.json(allPlayers);
  } catch (error) {
    next(error);
  }
});

router.get("/:playerId", async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.playerId);
    res.json(player);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  const { name, fullName, birthday, hallOfFame, url } = req.body;

  try {
    const createdPlayer = await Player.create({
      name,
      fullName,
      birthday,
      hallOfFame,
      url,
    });
    res.json(createdPlayer);
  } catch (error) {
    next(error);
  }
});

router.post("/bulk", isAdmin, async (req, res, next) => {
  const { players } = req.body;
  try {
    const createdPlayers = await Promise.all(
      players.map((player) => {
        return Player.create({
          name: player.name,
          fullName: player.fullName,
          birthday: player.birthday,
          hallOfFame: player.hallOfFame,
          url: player.url,
        });
      })
    );
    res.json(createdPlayers);
  } catch (error) {
    if (error.errors && error.errors[0].message === "name must be unique") {
      error.message = `Player ${error.errors[0].value} already exists.`;
    }

    next(error);
  }
});

router.post("/scrape", isAdmin, async (req, res, next) => {
  const url = req.body;

  // validate url
  const valid =
    /^https?:\/\/www.baseball-reference.com\/players\/[a-z]\/\w{4,7}\d{2}.shtml/.test(
      url
    ) ||
    /^https?:\/\/www.baseball-reference.com\/register\/player.fcgi\?id=/.test(
      url
    );

  if (valid) {
    try {
      const playerData = await require("./scrape")(url);

      const createdPlayer = await Player.create({
        name: playerData.name,
        fullName: playerData.fullName,
        birthday: playerData.birthday,
        hallOfFame: playerData.hallOfFame,
        url,
      });

      res.json(createdPlayer);
    } catch (error) {
      if (
        error.errors &&
        (error.errors[0].message === "name must be unique" ||
          error.errors[0].message === "url must be unique")
      ) {
        error.message = `Player already exists.`;
      }
      next(error);
    }
  } else {
    next(new Error("Invalid URL"));
  }
});

router.post("/scrape/bulk", isAdmin, async (req, res, next) => {
  const { playerNames } = req.body;

  try {
    // scrape card data
    let playerData = await require("./search")(playerNames);

    // res.jaon(playerData);

    const filters = playerData.map((p) => {
      return {
        [Op.or]: [
          {
            [Op.and]: {
              name: p.name,
              birthday: p.birthday,
            },
          },
          {
            url: p.url,
          },
        ],
      };
    });

    const duplicatePlayers = await Player.findAll({
      where: {
        [Op.or]: filters,
      },
    });

    // res.json(duplicatePlayers);

    // if there are duplicates, filter playerData
    if (duplicatePlayers.length > 0) {
      playerData = playerData.filter((player) => {
        return !duplicatePlayers.some((duplicate) => {
          if (
            duplicate.name === player.name &&
            duplicate.birthday === player.birthday
          ) {
            return true;
          }

          return duplicate.url === player.url;
        });
      });
    }

    if (playerData.length > 0) {
      // bulk add
      const players = await Player.bulkCreate(playerData);
      res.json(players);
    } else {
      res.json([]);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:playerId", isAdmin, async (req, res, next) => {
  const { name, fullName, birthday, hallOfFame } = req.body;
  try {
    await Player.update(
      { name, fullName, birthday, hallOfFame },
      { where: { id: req.params.playerId } }
    );
    const updatedPlayer = await Player.findByPk(req.params.playerId);
    res.json(updatedPlayer);
  } catch (error) {
    next(error);
  }
});

router.delete("/:playerId", isAdmin, async (req, res, next) => {
  try {
    const deleteStatus = await Player.destroy({
      where: { id: req.params.playerId },
    });
    res.json(deleteStatus);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
