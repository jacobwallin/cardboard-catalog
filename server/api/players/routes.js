const router = require("express").Router();

const { Player } = require("../../db/models");

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

router.post("/", async (req, res, next) => {
  const { name, birthday, hallOfFame } = req.body;

  try {
    const createdPlayer = await Player.create({
      name,
      birthday,
      hallOfFame,
    });
    res.json(createdPlayer);
  } catch (error) {
    next(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  const { players } = req.body;
  try {
    const createdPlayers = await Promise.all(
      players.map((player) => {
        return Player.create({
          name: player.name,
          birthday: player.birthday,
          hallOfFame: player.hallOfFame,
        });
      })
    );
    res.json(createdPlayers);
  } catch (error) {
    next(error);
  }
});

router.put("/:playerId", async (req, res, next) => {
  const { name, birthday, hallOfFame } = req.body;
  try {
    await Player.update(
      { name, birthday, hallOfFame },
      { where: { id: req.params.playerId } }
    );
    const updatedPlayer = await Player.findByPk(req.params.playerId);
    res.json(updatedPlayer);
  } catch (error) {
    next(error);
  }
});

router.delete("/:playerId", async (req, res, next) => {
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
