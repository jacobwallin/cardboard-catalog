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
  GradingCompany,
  Player,
  CardDataPlayer,
} = require("../models");

const {
  users,
  sets,
  brands,
  teams,
  leagues,
  gradingCompanies,
} = require("./seed_data");

const db = require("../db");

const seed = async () => {
  try {
    await db.sync({ force: true });

    // bulk create from local seed data
    await User.bulkCreate(users);
    await League.bulkCreate(leagues);
    await Brand.bulkCreate(brands);
    await Team.bulkCreate(teams);
    await Set.bulkCreate(sets);
    await GradingCompany.bulkCreate(gradingCompanies);

    // bulk create from Mockaroo API
    await Player.bulkCreate(
      await fetchData("https://my.api.mockaroo.com/player.json?key=128d2830")
    );
    await Subset.bulkCreate(
      await fetchData("https://my.api.mockaroo.com/subsets.json?key=128d2830")
    );
    await Series.bulkCreate(
      await fetchData("https://my.api.mockaroo.com/series.json?key=128d2830")
    );

    // fetch card data
    let promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(
        fetchData(`https://my.api.mockaroo.com/card_data.json?key=128d2830`)
      );
    }

    // combine into one array once all data is received
    let cardData = await fetchData(
      `https://my.api.mockaroo.com/card_data.json?key=128d2830`
    );

    // set subsetId, API was not working correctly with this formula
    cardData = cardData.map((cardData, index) => {
      return { ...cardData, subsetId: Math.floor(index / 50) + 1 };
    });

    // create all card data in db
    await CardData.bulkCreate(cardData);

    // populate card data and series join table
    await Card.bulkCreate(createCards());

    // populate card data and player join table
    await CardDataPlayer.bulkCreate(createCardDataPlayer());

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
  for (let i = 1; i <= 450; i++) {
    const endingSeries = Math.ceil(i / 50) + 3;
    for (let j = 0; j < 3; j++) {
      cards.push({ seriesId: endingSeries - j, cardDataId: i });
    }
  }
  return cards;
};

// creates card_data to player join table
const createCardDataPlayer = () => {
  const cardDataPlayerJoins = [];
  for (let i = 1; i <= 450; i++) {
    let playerId = Math.ceil(Math.random() * 500);
    cardDataPlayerJoins.push({ cardDatumId: i, playerId });
  }

  return cardDataPlayerJoins;
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
