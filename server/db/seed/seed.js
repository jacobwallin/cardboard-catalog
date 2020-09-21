const {
  User,
  Card,
  CardData,
  Set,
  Subset,
  Series,
  Brand,
  Team,
  League,
  Attribute,
} = require("../models");

const {
  users,
  cardData,
  sets,
  subsets,
  series,
  brands,
  teams,
  leagues,
  attributes,
} = require("./seed_data");

const db = require("../db");

const seed = async () => {
  try {
    await db.sync({ force: true });
    await User.bulkCreate(users);
    await League.bulkCreate(leagues);
    await Brand.bulkCreate(brands);
    await Attribute.bulkCreate(attributes);
    await Team.bulkCreate(teams);
    await Set.bulkCreate(sets);
    await Subset.bulkCreate(subsets);
    await Series.bulkCreate(series);
    await CardData.bulkCreate(cardData);
    await Card.bulkCreate(createCards());
    console.log("--SEEDING COMPLETE--");
    await db.close();
  } catch (error) {
    db.close();
    console.log("*****SEEDING ERROR*****", error.message);
  }
};

// creates card_data to series join table
const createCards = () => {
  const cards = [];
  for (let i = 1; i <= 10000; i++) {
    const endingSeries = Math.ceil(i / 100) * 5;
    for (let j = 0; j < 5; j++) {
      cards.push({ seriesId: endingSeries - j, cardDatumId: i });
    }
  }

  return cards;
};

seed();
