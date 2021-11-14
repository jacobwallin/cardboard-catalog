const db = require("../db");
const { DataTypes } = require("sequelize");

const Subset = db.define("subset", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  baseSeriesId: {
    type: DataTypes.INTEGER,
  },
  prefix: {
    type: DataTypes.STRING,
  },
});

module.exports = Subset;
