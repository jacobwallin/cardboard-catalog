const router = require("express").Router();
const collection = require("./collection");
const sets = require("./sets/routes");
const subsets = require("./subsets/routes");
const series = require("./series/routes");
const cards = require("./cards/routes");

router.use("/collection", collection);
router.use("/sets", sets);
router.use("/subsets", subsets);
router.use("/series", series);
router.use("/cards", cards);

module.exports = router;
