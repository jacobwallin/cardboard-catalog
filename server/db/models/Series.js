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
  parallel: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  refractor: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = CardRun;
