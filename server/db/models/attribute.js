const db = require("../db");
const { DataTypes } = require("sequelize");

const Attribute = db.define("attribute", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Attribute;
