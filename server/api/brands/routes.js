const router = require("express").Router();

const { Brand } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allBrands = await Brand.findAll();
    res.json(allBrands);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
