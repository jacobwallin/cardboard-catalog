const db = require("../db");
const { DataTypes } = require("sequelize");

const Brand = db.define("Brand", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Brand;
