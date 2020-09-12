const router = require("express").Router();
const collection = require("./collection");
const library = require("./library");

router.use("/collection", collection);
router.use("/library", library);

module.exports = router;
