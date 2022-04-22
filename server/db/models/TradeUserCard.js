const db = require("../db");
const { DataTypes } = require("sequelize");

const TradeUserCard = db.define(
  "trade_user_card",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = TradeUserCard;
