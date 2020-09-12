const {
  User,
  Card,
  Set,
  Subset,
  Brand,
  Team,
  League,
  Attribute,
} = require("../models");

const {
  users,
  cards,
  sets,
  subsets,
  brands,
  teams,
  leagues,
  attributes,
} = require("./seed_data");

const db = require("../db");

const seed = async () => {
  await db.sync({ force: true });

  await User.bulkCreate(users);
  await League.bulkCreate(leagues);
  await Brand.bulkCreate(brands);
  await Attribute.bulkCreate(attributes);
  await Team.bulkCreate(teams);
  await Set.bulkCreate(sets);
  await Subset.bulkCreate(subsets);
  await Card.bulkCreate(cards);
};

seed();
