const router = require("express").Router();
const { isAdmin } = require("../../middleware");

const { Brand } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allBrands = await Brand.findAll();
    res.json(allBrands);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newBrand = await Brand.create({ name });
    res.json(newBrand);
  } catch (error) {
    next(error);
  }
});

router.put("/:brandId", isAdmin, async (req, res, next) => {
  const { brandId } = req.params;
  const { name } = req.body;
  try {
    const brand = await Brand.findByPk(brandId);
    brand.name = name;
    await brand.save();
    res.json(brand);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
