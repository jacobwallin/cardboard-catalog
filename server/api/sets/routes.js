const router = require("express").Router();

const { isAdmin } = require("../../middleware");

const { Set, Brand, League, Subset, Series, User } = require("../../db/models");

// get a summary of all sets in the library
router.get("/", async (req, res, next) => {
  const { sportId, year, brandId, limit, offset, sort, sort_direction } =
    req.query;

  try {
    let filters = {};
    if (sportId) filters.leagueId = sportId;
    if (year) filters.year = year;
    if (brandId) filters.brandId = brandId;

    let order = [];
    if (sort) {
      let direction = "DESC";
      if (sort_direction === "asc") direction = "ASC";
      switch (sort) {
        case "name":
          order = [
            ["name", direction],
            ["createdAt", "DESC"],
          ];
          break;
        case "year":
          order = [
            ["year", direction],
            ["createdAt", "DESC"],
          ];
          break;
        case "brand":
          order = [
            [Brand, "name", direction],
            ["createdAt", "DESC"],
          ];
          break;
        case "league":
          order = [
            [League, "name", direction],
            ["createdAt", "DESC"],
          ];
          break;
        case "date":
          order = [["createdAt", direction]];
          break;

        default:
          break;
      }
    }

    const allSets = await Set.findAndCountAll({
      order,
      attributes: { exclude: ["description"] },
      include: [
        { model: League, attributes: ["id", "name"] },
        { model: Brand, attributes: ["id", "name"] },
      ],
      where: filters,
      limit,
      offset,
    });

    res.json(allSets);
  } catch (error) {
    next(error);
  }
});

// get data for a single set from the library
router.get("/:setId", async (req, res, next) => {
  try {
    const setData = await Set.findByPk(req.params.setId, {
      include: [
        { model: League, attributes: ["id", "name"] },
        { model: Brand, attributes: ["id", "name"] },
        {
          model: Subset,
        },
        {
          model: User,
          as: "createdByUser",
          attributes: ["username"],
        },
        {
          model: User,
          as: "updatedByUser",
          attributes: ["username"],
        },
      ],
    });

    res.json(setData);
  } catch (error) {
    next(error);
  }
});

// *** ADMIN ROUTES ***

router.post("/", isAdmin, async (req, res, next) => {
  const { name, release_date, description, leagueId, brandId, year, complete } =
    req.body;

  try {
    // create new set
    let newSet = await Set.create({
      name,
      release_date,
      year,
      description,
      leagueId,
      brandId,
      complete,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });

    // create initial base subset and base series
    let baseSubset = await Subset.create({
      name: "Base Set",
      setId: newSet.id,
      createdBy: req.user.id,
      updatedBy: req.user.id,
      base: true,
    });
    let baseSeries = await Series.create({
      name: "Base Set",
      subsetId: baseSubset.id,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });

    // set base series and subset ids and save
    baseSubset.baseSeriesId = baseSeries.id;
    await baseSubset.save();

    // eager load created set to include league and brand
    const createdSet = await Set.findByPk(newSet.id, {
      include: [League, Brand],
    });
    res.status(201).json(createdSet);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/:setId", isAdmin, async (req, res, next) => {
  const { name, release_date, year, description, leagueId, brandId, complete } =
    req.body;

  try {
    await Set.update(
      {
        name,
        release_date,
        year,
        description,
        leagueId,
        brandId,
        complete,
        updatedBy: req.user.id,
      },
      { where: { id: req.params.setId } }
    );

    const updatedSet = await Set.findByPk(req.params.setId, {
      include: [League, Brand],
    });

    res.json(updatedSet);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/:setId", isAdmin, async (req, res, next) => {
  try {
    const deleteSuccess = await Set.destroy({
      where: { id: req.params.setId },
    });
    res.json(deleteSuccess);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
