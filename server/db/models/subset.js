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
});

module.exports = Subset;
