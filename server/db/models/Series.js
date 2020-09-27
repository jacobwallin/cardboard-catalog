const db = require("../db");
const { DataTypes } = require("sequelize");

const CardRun = db.define("series", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  serializedTo: {
    type: DataTypes.INTEGER,
  },
});

module.exports = CardRun;
