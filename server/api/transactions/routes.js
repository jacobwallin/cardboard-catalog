const router = require("express").Router();

const {
  Transaction,
  UserCard,
  Card,
  TransactionUserCard,
} = require("../../db/models");

const { getTransactionById } = require("./common");

// get all transactions
router.get("/", async (req, res, next) => {
  const { status } = req.query;
  try {
    let allTransactions = [];
    if (status === "pending") {
      allTransactions = await Transaction.findAll({
        where: { userId: req.user.id, pending: true },
        include: TransactionUserCard,
      });
    } else {
      allTransactions = await Transaction.findAll({
        where: { userId: req.user.id, pending: false },
        include: TransactionUserCard,
      });
    }

    res.json(allTransactions);
  } catch (error) {
    next(error);
  }
});

router.get("/:transactionId", async (req, res, next) => {
  try {
    const transaction = await getTransactionById(
      req.params.transactionId,
      req.user.id
    );

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
    pending,
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
        pending: type === "ADD" || type === "DELETE" ? false : pending,
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
            // set userId to null if pending so cards do not show in user's collection
            userId: transaction.pending ? null : userId,
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
  const { transactionId } = req.params;
  // additional cards that were added to the transaction, these are cardIds
  const { cardsAdded } = req.body;
  // cards that are currently added in transaction that need to be un-added; these will be transactionUserCardIds
  const { addedCardsRemoved } = req.body;
  // additional cards that were removed in transaction; these will be userCardIds
  const { userCardsRemoved } = req.body;
  // cards that are currently deleted in transaction that need to un-deleted; these will be transactionUserCardIds
  const { removedCardsAdded } = req.body;
  // transaction data
  const { money, platform, individual, title, note, date, pending } = req.body;

  try {
    const transaction = await Transaction.findByPk(transactionId);

    // UPDATE TRANSACTION DATA
    if (money) transaction.money = money;
    if (platform) transaction.platform = platform;
    if (individual) transaction.individual = individual;
    if (title) transaction.title = title;
    if (note) transaction.note = note;
    if (date) transaction.date = date;

    // transaction can only go from pending to not pending, not vice versa
    if (pending === false && transaction.pending === true) {
      // if making transaction final, set pending to false and attach all added cards to the user
      transaction.pending = false;
      const userCards = await transaction.getUser_cards();
      await Promise.all(
        userCards
          .filter((uc) => uc.userId === null)
          .map((uc) => {
            console.log("***USER CARD", uc);
            uc.userId = req.user.id;
            return uc.save();
          })
      );
    }
    await transaction.save();

    // REMOVE ADDED CARDS
    if (addedCardsRemoved) {
      await Promise.all(
        addedCardsRemoved.map(async (id) => {
          const transactionUserCard = await TransactionUserCard.findByPk(id);
          const userCard = await transactionUserCard.getUser_card();
          // only remove added card if it has not been subsequently deleted
          if (!userCard.deletedAt) {
            // card will be permanently deleted as to not appear in an transaction
            userCard.destroy({ force: true });
          }
        })
      );
    }

    // REMOVE DELETED CARDS
    if (removedCardsAdded) {
      await Promise.all(
        removedCardsAdded.map(async (id) => {
          const transactionUserCard = await TransactionUserCard.findByPk(id);
          const userCard = await transactionUserCard.getUser_card({
            paranoid: false,
          });
          // un-delete userCard
          await userCard.restore();
          // delete transactionUserCard to remove card from transaction
          await transactionUserCard.destroy();
        })
      );
    }

    // ADD CARDS TO TRANSACTION
    if (cardsAdded) {
      const newUserCards = await UserCard.bulkCreate(
        cardsAdded.map((cardInfo) => {
          return {
            serialNumber: cardInfo.serialNumber,
            grade: cardInfo.grade,
            cardId: cardInfo.cardId,
            gradingCompanyId: cardInfo.gradingCompanyId,
            userId: transaction.pending ? null : req.user.id,
          };
        })
      );
      await transaction.addUser_cards(newUserCards);
    }

    // DELETE CARDS IN TRANSACTION
    if (userCardsRemoved) {
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

    res.json(await getTransactionById(req.params.transactionId, req.user.id));
  } catch (error) {
    console.log("ERROR: ", error.message);
    next(error);
  }
});

router.delete("/:transactionId", async (req, res, next) => {
  // deleting transaction should also undo all effects on collection (adding / deleting cards)
  // if the transaction contains cards that were added into the users collection,
  // prevent deletion of any of those cards were then deleted in another transaction
});

module.exports = router;
