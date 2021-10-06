const db = require("../db");
const { DataTypes } = require("sequelize");

const Set = db.define("set", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  baseSubsetId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Set;
