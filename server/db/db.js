const Sequelize = require("sequelize");

const dbURL =
  process.env.HEROKU_POSTGRESQL_MAUVE_URL || "postgres://localhost:5432/cards";

const db = process.env.HEROKU_POSTGRESQL_MAUVE_URL
  ? new Sequelize(dbURL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(dbURL);

module.exports = db;
