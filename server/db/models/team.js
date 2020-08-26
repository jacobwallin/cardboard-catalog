const db = require("../db");
const { DataTypes } = require("sequelize");

const Team = db.define("Team", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Team;
