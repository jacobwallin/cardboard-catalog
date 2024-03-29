const router = require("express").Router();

const collection = require("./collection/routes");
const sets = require("./sets/routes");
const subsets = require("./subsets/routes");
const series = require("./series/routes");
const cardData = require("./card_data/routes");
const cards = require("./cards/routes");
const players = require("./players/routes");
const teams = require("./teams/routes");
const sports = require("./sports/routes");
const brands = require("./brands/routes");
const gradingCompanies = require("./grading_companies/routes");
const transactions = require("./transactions/routes");
const friends = require("./friends/routes");

router.use("/collection", collection);
router.use("/sets", sets);
router.use("/subsets", subsets);
router.use("/series", series);
router.use("/carddata", cardData);
router.use("/cards", cards);
router.use("/players", players);
router.use("/teams", teams);
router.use("/leagues", sports);
router.use("/brands", brands);
router.use("/grading_companies", gradingCompanies);
router.use("/transactions", transactions);
router.use("/friends", friends);

module.exports = router;
