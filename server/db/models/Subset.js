const db = require("../db");
const { DataTypes } = require("sequelize");

const Subset = db.define("subset", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  baseSeriesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Subset;
