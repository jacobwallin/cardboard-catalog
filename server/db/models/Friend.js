const db = require("../db");
const { DataTypes } = require("sequelize");

const Friend = db.define(
  "friend",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    friend_id: {
      type: DataTypes.DECIMAL,
      primaryKey: true,
    },
  },
  {
    // index by friend then user to allow joins on friend_id to use index
    indexes: [
      {
        unique: true,
        fields: ["friend_id", "user_id"],
      },
    ],
  }
);

module.exports = Friend;
