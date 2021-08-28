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
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=0"
      )
    );
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=10"
      )
    );
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=20"
      )
    );
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=30"
      )
    );
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=40"
      )
    );
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=50"
      )
    );
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=60"
      )
    );
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=70"
      )
    );
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=80"
      )
    );
    await CardData.bulkCreate(
      await fetchData(
        "https://my.api.mockaroo.com/card_data.json?key=128d2830&offset=90"
      )
    );
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
  for (let i = 1; i <= 10000; i++) {
    const endingSeries = Math.ceil(i / 100) * 5;
    for (let j = 0; j < 5; j++) {
      cards.push({ seriesId: endingSeries - j, cardDataId: i });
    }
  }

  return cards;
};

// creates card_data to player join table
const createCardDataPlayer = () => {
  const cardDataPlayerJoins = [];
  for (let i = 1; i <= 10000; i++) {
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
