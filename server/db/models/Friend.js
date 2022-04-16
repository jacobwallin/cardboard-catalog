const db = require("../db");
const { DataTypes } = require("sequelize");

const Friend = db.define(
  "friend",
  {
    user_one_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_two_id: {
      type: DataTypes.DECIMAL,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator: (value) => {
          const enums = ["PENDING", "ACCEPTED"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["user_one_id", "user_two_id"],
      },
    ],
  }
);

module.exports = Friend;
