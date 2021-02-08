const db = require("../db");
const { DataTypes } = require("sequelize");

const CardRun = db.define("series", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: "#ffffff",
  },
  serialized: {
    type: DataTypes.INTEGER,
  },
  auto: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  relic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  manufacturedRelic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  parallel: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  shortPrint: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = CardRun;
