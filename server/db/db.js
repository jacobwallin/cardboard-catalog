const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/card-collection");

module.exports = db;
