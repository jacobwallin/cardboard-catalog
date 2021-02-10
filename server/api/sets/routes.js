const router = require("express").Router();

const { body, validationResult } = require("express-validator");

const { Set, Brand, League, Subset } = require("../../db/models");

// get a summary of all sets in the library
router.get("/", async (req, res, next) => {
  try {
    const allSets = await Set.findAll({
      attributes: ["id", "name", "year"],
      order: [
        ["year", "ASC"],
        ["name", "ASC"],
      ],
      include: [
        { model: Brand, attributes: ["id", "name"] },
        { model: League, attributes: ["id", "name"] },
      ],
    });

    res.json(allSets);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

// get data for a single set from the library
router.get("/:setId", async (req, res, next) => {
  try {
    const setData = await Set.findByPk(req.params.setId, {
      attributes: [
        "id",
        "name",
        "year",
        "description",
        "createdAt",
        "updatedAt",
      ],
      include: [
        { model: League, attributes: ["id", "name"] },
        { model: Brand, attributes: ["id", "name"] },
        {
          model: Subset,
          attributes: ["id", "name", "cardQuantity", "description", "setId"],
        },
      ],
    });

    res.json(setData);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post(
  "/",
  body("description").isString().trim(),
  async (req, res, next) => {
    const { name, year, description, leagueId, brandId } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const createdSet = await Set.create({
        name,
        year,
        description,
        leagueId,
        brandId,
      });
      res.status(201).json(createdSet);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.put("/:setId", async (req, res, next) => {
  const { name, year, description, leagueId, brandId } = req.body;

  try {
    await Set.update(
      { name, year, description, leagueId, brandId },
      { where: { id: req.params.setId } }
    );

    const updatedSet = await Set.findByPk(req.params.setId, {
      include: [League, Brand],
    });

    res.json(updatedSet);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

router.delete("/:setId", async (req, res, next) => {
  setTimeout(() => {
    res.json(1);
  }, 5000);
  // try {
  //   const deleteSuccess = await Set.destroy({
  //     where: { id: req.params.setId },
  //   });
  //   res.json(deleteSuccess);
  // } catch (error) {
  //   res.sendStatus(500);
  // }
});

module.exports = router;