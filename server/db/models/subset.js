const db = require("../db");
const { DataTypes } = require("sequelize");

const Subset = db.define("subset", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalCards: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serializedTo: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Subset;
