const router = require("express").Router();

const { validationResult } = require("express-validator");

const { postSubsetValidate } = require("./validation");

const {
  Subset,
  Series,
  Attribute,
  Card,
  CardData,
  Team,
} = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const subsets = await Subset.findAll();
    res.json(subsets);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get card information for a complete subset (includes every series)
router.get("/:subsetId", async (req, res, next) => {
  try {
    const subset = await Subset.findByPk(req.params.subsetId, {
      include: [
        {
          model: Series,
          attributes: ["id", "name", "color", "serializedTo"],
          include: [
            {
              model: Attribute,
              attributes: ["id", "name"],
            },
            {
              model: Card,
              attributes: ["id"],
              include: {
                model: CardData,
                attributes: ["name", "number", "rookie"],
                include: {
                  model: Team,
                  attributes: ["name"],
                },
              },
            },
          ],
        },
      ],
    });

    res.json(subset);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

router.post("/", postSubsetValidate, async (req, res, next) => {
  const { name, cardQuantity, description, setId } = req.body;
  try {
    const createdSubset = await Subset.create({
      name,
      cardQuantity,
      description,
      setId,
    });
    res.json(createdSubset);
  } catch (error) {
    next(error);
  }
});

router.put("/:subsetId", async (req, res, next) => {
  const { name, cardQuantity, description } = req.body;

  try {
    const updatedSubset = await Subset.update(
      { name, cardQuantity, description },
      { where: { id: req.params.subsetId } }
    );
    res.json(updatedSubset);
  } catch (error) {
    next(error);
  }
});

router.delete("/:subsetId", async (req, res, next) => {
  try {
    const deleteSuccess = await Subset.destroy({
      where: { id: req.params.subsetId },
    });
    res.json(deleteSuccess);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
