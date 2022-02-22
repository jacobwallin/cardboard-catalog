const router = require("express").Router();

const { Transaction } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({
      where: { userId: req.user.id },
    });
    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
