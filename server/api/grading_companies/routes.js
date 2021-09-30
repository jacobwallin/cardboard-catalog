const router = require("express").Router();

const { isAdmin } = require("../../middleware");

const { GradingCompany } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allGradingCompanies = await GradingCompany.findAll();
    res.json(allGradingCompanies);
  } catch (error) {
    next(error);
  }
});

router.get("/:companyId", async (req, res, next) => {
  try {
    const gradingCompany = await GradingCompany.findByPk(req.params.companyId);
    res.json(gradingCompany);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  const { name } = req.body;
  try {
    const createdGradingCompany = await GradingCompany.create({ name });
    res.json(createdGradingCompany);
  } catch (error) {
    next(error);
  }
});

router.put("/:companyId", isAdmin, async (req, res, next) => {
  const { name } = req.body;
  try {
    await GradingCompany.update(
      { name },
      { where: { id: req.params.companyId } }
    );
    const updatedGradingCompany = await GradingCompany.findByPk(
      req.params.companyId
    );
    res.json(updatedGradingCompany);
  } catch (error) {
    next(error);
  }
});

router.delete("/:companyId", isAdmin, async (req, res, next) => {
  try {
    const deleteStatus = await GradingCompany.destroy({
      where: { id: req.params.companyId },
    });
    res.json(deleteStatus);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
