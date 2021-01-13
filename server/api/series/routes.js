const router = require("express").Router();

const { Series, Attribute } = require("../../db/models");

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
    const series = await Series.findByPk(req.params.seriesId, {
      include: {
        model: Attribute,
      },
    });
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
  const { name, color, serializedTo, attributes } = req.body;
  try {
    const series = await Series.findByPk(req.params.seriesId, {
      include: Attribute,
    });

    if (name) series.name = name;
    if (color) series.color = color;
    if (serializedTo) series.serializedTo = serializedTo;
    await series.save();

    if (attributes) {
      // find which attributes need to be added and removed
      const addAttributePks = [];
      attributes.forEach((attributePk) => {
        const idx = series.attributes.findIndex(
          (attribute) => attribute.id === attributePk
        );
        if (idx === -1) addAttributePks.push(attributePk);
      });

      const removeAttributePks = [];
      series.attributes.forEach((attribute) => {
        const idx = attributes.findIndex(
          (attributePk) => attributePk === attribute.id
        );
        if (idx === -1) removeAttributePks.push(attribute.id);
      });

      // get instances of attribtues to add or remove
      const attributesToRemove = await Promise.all(
        removeAttributePks.map(async (attributePk) => {
          return Attribute.findByPk(attributePk);
        })
      );

      const attributesToAdd = await Promise.all(
        addAttributePks.map(async (attributePk) => {
          return Attribute.findByPk(attributePk);
        })
      );

      // add and remove attributes
      await series.addAttributes(
        // remove null values if invalid primary key was received for an attribute
        attributesToAdd.filter((attr) => attr !== null)
      );
      await series.removeAttributes(
        attributesToRemove.filter((attr) => attr !== null)
      );
    }

    const updatedSeries = await Series.findByPk(req.params.seriesId, {
      include: Attribute,
    });

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
