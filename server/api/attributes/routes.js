const router = require("express").Router();
const { Attribute } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allAttributes = await Attribute.findAll();
    res.json(allAttributes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
