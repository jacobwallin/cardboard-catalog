const db = require("../db");
const { DataTypes } = require("sequelize");

const GradingCompany = db.define("grading_company", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = GradingCompany;
