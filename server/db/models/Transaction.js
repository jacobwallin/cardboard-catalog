const db = require("../db");
const { DataTypes } = require("sequelize");

const Team = db.define("transaction", {
  title: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  setId: {
    type: DataTypes.INTEGER,
  },
  platform: {
    type: DataTypes.STRING,
  },
  individual: {
    type: DataTypes.STRING,
  },
  money: {
    type: DataTypes.FLOAT,
  },
});

module.exports = Team;
