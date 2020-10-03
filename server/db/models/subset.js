const db = require("../db");
const { DataTypes } = require("sequelize");

const Subset = db.define("subset", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Subset;
