const router = require("express").Router();
const cards = require("./cards");
const sets = require("./sets");

router.use("/cards", cards);
router.use("/sets", sets);

module.exports = router;
