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
router.get("/league/:leagueId", async (req, res, next) => {
  try {
    const allTeams = await Team.findAll({
      where: {
        leagueId: req.params.leagueId,
      },
      include: League,
    });
    res.json(allTeams);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, leagueId } = req.body;
  try {
    const newTeam = await Team.create({ name, leagueId });
    res.json(newTeam);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
