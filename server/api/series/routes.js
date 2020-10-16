const router = require("express").Router();

const { Series } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allSeries = await Series.findAll();
    res.json(allSeries);
  } catch (error) {
    next(error);
  }
});

router.get("/:seriesId", async (req, res, next) => {
  try {
    const series = await Series.findByPk(req.params.seriesId);
    res.json(series);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, color, serializedTo, subsetId } = req.body;
  //TODO: cards must be created for the series

  try {
    const createdSeries = await Series.create({
      name,
      color,
      serializedTo,
      subsetId,
    });
    res.json(createdSeries);
  } catch (error) {
    next(error);
  }
});

router.put("/:seriesId", async (req, res, next) => {
  const { name, color, serializedTo, subsetId } = req.body;
  try {
    const updatedSeries = await Series.update(
      { name, color, serializedTo, subsetId },
      { where: { id: req.params.id } }
    );

    res.json(updatedSeries);
  } catch (error) {
    next(error);
  }
});

router.delete("/:seriesId", async (req, res, next) => {
  try {
    const deleteSuccess = await Series.destroy({
      where: { id: req.params.id },
    });
    res.json(deleteSuccess);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
