const db = require("../db");
const { DataTypes } = require("sequelize");

const Team = db.define("trade", {
  request_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  respond_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Team;
