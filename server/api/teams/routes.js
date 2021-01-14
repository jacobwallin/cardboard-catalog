const router = require("express").Router();

const { Team, League } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allTeams = await Team.findAll({ include: League });
    res.json(allTeams);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
