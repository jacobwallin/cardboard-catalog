const { Card, Set, Brand, Team } = require("../models");

const { cards, sets, brands, teams } = require("./seedData");

const db = require("../db");

db.sync({ force: true }).then(() => {
  Brand.bulkCreate(brands).then((newBrands) => {
    console.log("BRANDS SEEDED");
    Team.bulkCreate(teams).then((newTeams) => {
      console.log("TEAMS SEEDED");
      Set.bulkCreate(sets).then((newSets) => {
        console.log("SETS SEEDED");
        Card.bulkCreate(cards).then((newCards) => {
          console.log("CARDS SEEDED");
        });
      });
    });
  });
});
