const router = require("express").Router();

const { Friend } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const userFriends = await Friend.findAll({
      where: {
        user_id: req.user.id,
      },
    });
    res.json(userFriends);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
