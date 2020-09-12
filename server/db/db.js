const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/cardboard_collector");

module.exports = db;
