const router = require("express").Router();
const collection = require("./collection");
const sets = require("./sets/routes");
const subsets = require("./subsets/routes");
const series = require("./series/routes");
const cards = require("./cards/routes");
const brands = require("./brands/routes");
const leagues = require("./leagues/routes");
const attributes = require("./attributes/routes");
const teams = require("./teams/routes");

router.use("/collection", collection);
router.use("/sets", sets);
router.use("/subsets", subsets);
router.use("/series", series);
router.use("/cards", cards);
router.use("/brands", brands);
router.use("/leagues", leagues);
router.use("/attributes", attributes);
router.use("/teams", teams);

module.exports = router;
