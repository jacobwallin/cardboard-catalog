const router = require("express").Router();

const { Transaction, UserCard } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({
      where: { userId: req.user.id },
    });

    res.json({ yousuck: true });
    // res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

router.post("/quickadd", async (req, res, next) => {
  // add cards to user's collection
  const { cardsToAdd } = req.body;
  const userId = req.user.id;
  try {
    // bulk create user card entries
    const userCards = await UserCard.bulkCreate(
      cardsToAdd.map((cardInfo) => {
        return {
          serialNumber: cardInfo.serialNumber,
          grade: cardInfo.grade,
          cardId: cardInfo.cardId,
          gradingCompanyId: cardInfo.gradingCompanyId,
          userId: userId,
        };
      })
    );

    // create new transaction
    Transaction.create({
      title: "test",
      note: "this is a test transaction!",
    });

    res.status(201).json(userCards);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
