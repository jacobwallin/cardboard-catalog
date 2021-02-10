const db = require("../db");
const { DataTypes } = require("sequelize");
const Player = require("./Player");
const CardData = require("./CardData");

const CardDataPlayer = db.define("card_data_player", {
  cardDatumId: {
    type: DataTypes.INTEGER,
    references: {
      model: CardData,
      key: "id",
    },
  },
  playerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Player,
      key: "id",
    },
  },
});

module.exports = CardDataPlayer;
