const fetch = require("../../utils/fetch");
const parse = require("./parse");

const search = (playerNames) => {
  // search baseball reference for each player
  return Promise.all(
    playerNames.map((name) => {
      console.log("player name: ", name);
      return fetch(
        `https://www.baseball-reference.com/search/search.fcgi?search=${encodeURIComponent(
          name
        )}`
      );
    })
  )
    .then((response) => {
      const notRedirected = response.filter((page) => {
        return page.statusCode === 200;
      });
      const found = response.filter((page) => {
        return page.statusCode === 302;
      });

      const locations = [];

      notRedirected.forEach((searchResultResponse) => {
        let searchResultPage = searchResultResponse.webpage;

        // find search results section
        const firstSearchItemIdx = searchResultPage.indexOf("search-item");
        const endSearchResultsIdx =
          searchResultPage.indexOf("search-pagination");

        // slice out search results portion of page, removing the first search-item section that was found
        const searchResults = searchResultPage.slice(
          firstSearchItemIdx + 12,
          endSearchResultsIdx
        );

        // if there is only one result, add slug to locations
        if (searchResults.indexOf('"search-item"') === -1) {
          const urlStartIdx = searchResults.indexOf("search-item-url");

          let urlSlug = searchResults.slice(urlStartIdx + 17);
          const urlSlugEndIdx = urlSlug.indexOf(".shtml");
          urlSlug = urlSlug.slice(0, urlSlugEndIdx + 6);

          locations.push(urlSlug);
        }
      });

      found.forEach((playerPage) => {
        locations.push(playerPage.location);
      });

      return Promise.all(
        locations.map((slug) => {
          return fetch(`https://www.baseball-reference.com${slug}`);
        })
      );
    })
    .then((playerPages) => {
      return playerPages.map((page) => {
        return parse(page);
      });
    });
};

module.exports = search;
