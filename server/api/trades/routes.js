const router = require("express").Router();

const { Trade } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const trades = await Trade.findAll();

    res.json(trades);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // verify users are friends
  // create trade
  // add cards to trade, verifying each card is from one of the two users
});

router.put("/:tradeId", async (req, res, next) => {});
