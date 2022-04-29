const router = require("express").Router();

const {
  Transaction,
  UserCard,
  Card,
  CardData,
  Series,
  Subset,
  Team,
  GradingCompany,
  Set,
  Player,
  TransactionUserCard,
} = require("../../db/models");

// get all transactions
router.get("/", async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({
      where: { userId: req.user.id },
      include: TransactionUserCard,
    });

    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

// get all pending transactions
router.get("/pending", async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({
      where: { userId: req.user.id, pending: true },
      include: TransactionUserCard,
    });

    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

router.get("/:transactionId", async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.transactionId, {
      where: { userId: req.user.id },
      include: {
        model: UserCard,
        paranoid: false,
        include: [
          {
            model: Card,
            attributes: {
              exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
            },
            include: [
              {
                model: CardData,
                attributes: {
                  exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
                },
                include: [
                  {
                    model: Team,
                    attributes: ["name"],
                  },
                  { model: Player },
                ],
              },
              {
                model: Series,
                attributes: {
                  exclude: ["createdAt", "updatedAt", "updatedBy", "createdBy"],
                },
                include: {
                  model: Subset,
                  attributes: {
                    exclude: [
                      "createdAt",
                      "updatedAt",
                      "updatedBy",
                      "createdBy",
                      "description",
                    ],
                  },
                  include: {
                    model: Set,
                    attributes: {
                      exclude: [
                        "createdAt",
                        "updatedAt",
                        "updatedBy",
                        "createdBy",
                        "release_date",
                        "description",
                        "complete",
                      ],
                    },
                  },
                },
              },
            ],
          },
          GradingCompany,
        ],
      },
    });

    if (transaction === null) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }

    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // get transaction data
  const {
    type,
    cardsAdded,
    userCardsRemoved,
    money,
    platform,
    individual,
    setId,
    title,
    note,
    date,
  } = req.body;

  const userId = req.user.id;
  try {
    let transaction = undefined;
    if (type === "ADD" || type === "DELETE") {
      // if transaction type is add or delete, check first if one was created for the current day
      transaction = await Transaction.findOne({
        where: {
          userId: req.user.id,
          type: type,
          date: date,
        },
      });
    }

    if (!transaction) {
      // create new transaction
      transaction = await Transaction.create({
        userId: req.user.id,
        type,
        date,
        title,
        note,
        platform,
        individual,
        money,
        setId,
      });
    }

    // add cards to collection and associate with transaction
    if (cardsAdded) {
      const newUserCards = await UserCard.bulkCreate(
        cardsAdded.map((cardInfo) => {
          return {
            serialNumber: cardInfo.serialNumber,
            grade: cardInfo.grade,
            cardId: cardInfo.cardId,
            gradingCompanyId: cardInfo.gradingCompanyId,
            userId: userId,
          };
        })
      );
      // add cards to transaction
      await transaction.addUser_cards(newUserCards);
    }

    // delete cards from collection and associate with transaction
    if (userCardsRemoved) {
      // get user card instances for each id given
      const userCards = await Promise.all(
        userCardsRemoved.map((userCardId) => {
          return UserCard.findByPk(userCardId, {
            // prevent other user's cards from being deleted in transaction
            where: {
              userId: req.user.id,
            },
          });
        })
      );

      // paranoid delete each user card
      await Promise.all(userCards.map((userCard) => userCard.destroy()));

      // add each user card to transaction user card join table, marking deleted as true
      await Promise.all(
        userCards.map((userCard) => {
          return TransactionUserCard.create({
            transactionId: transaction.id,
            userCardId: userCard.id,
            deleted: true,
          });
        })
      );
    }

    // re-query transaction with joins
    const transactionWithJoins = await Transaction.findByPk(transaction.id, {
      include: {
        model: UserCard,
        paranoid: false,
        include: {
          model: Card,
          attributes: ["id", "value", "serializedTo", "seriesId", "cardDataId"],
        },
      },
    });

    // send response
    res.status(201).json(transactionWithJoins);
  } catch (error) {
    next(error);
  }
});

router.put("/:transactionId", async (req, res, next) => {
  // additional cards that were added in transaction; these will be cardIds
  // * check if transaction is pending *
  const { cardsAdded } = req.body;
  // cards that are currently added in transaction that need to be un-added; these will be transactionUserIds
  // * must first verify the cards are not deleted in another transaction
  const { addedCardsRemoved } = req.body;
  // additional cards that were removed in transaction; these will be userCardIds
  const { cardsRemoved } = req.body;
  // cards that are currently deleted in transaction that need to un-deleted; these will be transactionUserIds
  const { removedCardsAdded } = req.body;

  // update transaction data

  // resolve cards added / removed
});

router.delete("/:transactionId", async (req, res, next) => {
  // deleting transaction should also undo all effects on collection (adding / deleting cards)
  // if the transaction contains cards that were added into the users collection,
  // prevent deletion of any of those cards were then deleted in another transaction
});

module.exports = router;
