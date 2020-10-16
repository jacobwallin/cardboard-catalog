const { body } = require("express-validator");
const { validationErrorHandling } = require("../../middleware");

const postSubsetValidate = [
  body("setId").isNumeric().withMessage("setId must be a number"),
  body("cardQuantity").isDate().withMessage("card quantity is not a date"),
  validationErrorHandling,
];

module.exports = { postSubsetValidate };
