const { body } = require("express-validator");
const { validationErrorHandling } = require("../../middleware");

const postSubsetValidate = [
  body("setId").isNumeric().withMessage("setId must be a number"),
  validationErrorHandling,
];

module.exports = { postSubsetValidate };
