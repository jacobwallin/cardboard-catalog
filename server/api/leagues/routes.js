const router = require("express").Router();

const { League } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allLeagues = await League.findAll();
    res.json(allLeagues);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
