const db = require("../db");
const { DataTypes } = require("sequelize");

const Set = db.define("set", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  baseSubsetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Set;
