const router = require("express").Router();
const { isAdmin } = require("../../middleware");

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

// *** ADMIN ROUTES ***

router.post("/", isAdmin, async (req, res, next) => {
  const { name, leagueId } = req.body;
  try {
    const newTeam = await Team.create({ name, leagueId });
    res.json(newTeam);
  } catch (error) {
    next(error);
  }
});

router.put("/:teamId", isAdmin, async (req, res, next) => {
  const { name } = req.body;
  try {
    const team = await Team.findByPk(req.params.teamId);
    team.name = name;
    await team.save();
    res.json(team);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
