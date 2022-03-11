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
    cardsRemoved,
    money,
    platform,
    individual,
    setId,
    title,
    notes,
    date,
  } = req.body;

  const userId = req.user.id;
  try {
    let transaction = undefined;
    if (type === "QUICK" || type === "DELETE") {
      // if transaction type is a quick add or delete, check first if one was created for the current day
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
        notes,
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
    if (cardsRemoved) {
      // get user card instances for each id given
      const userCards = await Promise.all(
        cardsRemoved.map((userCardId) => {
          return UserCard.findByPk(userCardId);
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
      },
    });

    // send response
    res.status(201).json(transactionWithJoins);
  } catch (error) {
    next(error);
  }
});

router.put("/:transactionId", async (req, res, next) => {
  // update transaction data
  // resolve cards added / removed
});

router.delete("/:transactionId", async (req, res, next) => {
  // deleting transaction should also undo all effects on collection (adding / deleting cards)
});

module.exports = router;
