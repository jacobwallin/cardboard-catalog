const fetch = require("../../utils/fetch");
const parse = require("./parse");

const scrapePlayerData = (url) => {
  return fetch(url).then((response) => {
    return parse(response);
  });
};

module.exports = scrapePlayerData;
