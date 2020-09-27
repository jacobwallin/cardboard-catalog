const https = require("https");

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
  sets,
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
    await Subset.bulkCreate(
      await fetchData("https://my.api.mockaroo.com/subsets.json?key=128d2830")
    );
    await Series.bulkCreate(
      await fetchData("https://my.api.mockaroo.com/series.json?key=128d2830")
    );
    await CardData.bulkCreate(
      await fetchData("https://my.api.mockaroo.com/card_data.json?key=128d2830")
    );
    await CardData.bulkCreate(
      await fetchData("https://my.api.mockaroo.com/card_data.json?key=128d2830")
    );
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
      cards.push({ seriesId: endingSeries - j, cardDataId: i });
    }
  }

  return cards;
};

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

seed();
