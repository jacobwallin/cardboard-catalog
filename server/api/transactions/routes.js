const router = require("express").Router();

const { Transaction, UserCard } = require("../../db/models");

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

router.get("/:transactionId", async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      where: { userId: req.user.id, id: req.params.transactionId },
      include: [UserCard],
    });

    res.json(transaction);
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
    const newTransaction = await Transaction.create({
      title: "test",
      note: "this is a test transaction!",
      userId: req.user.id,
    });

    // add cards to transaction
    await newTransaction.setUser_cards(userCards);

    res.status(201).json(userCards);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
