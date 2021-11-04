const fetch = require("../../utils/fetch");
const parse = require("./parse");

const search = (playerNames) => {
  // remove duplicate names
  var names = {};
  const uniquePlayerNames = playerNames.filter(function (item) {
    return names.hasOwnProperty(item) ? false : (names[item] = true);
  });

  // search baseball reference for each player
  return Promise.all(
    uniquePlayerNames.map((name) => {
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

        // if there is no search-item text found, there were no search hits found
        if (firstSearchItemIdx !== -1) {
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
            if (urlSlugEndIdx !== -1) {
              urlSlug = urlSlug.slice(0, urlSlugEndIdx + 6);
              if (
                /^\/players\/[a-z]\/\w{4,7}\d{2}.shtml/.test(urlSlug) ||
                /^\/register\/player.fcgi\?id=/.test(urlSlug)
              ) {
                locations.push(urlSlug);
              }
            }
          }
        }
      });

      found.forEach((playerPage) => {
        // validate url
        if (
          /^\/players\/[a-z]\/\w{4,7}\d{2}.shtml/.test(playerPage.location) ||
          /^\/register\/player.fcgi\?id=/.test(playerPage.location)
        ) {
          locations.push(playerPage.location);
        }
      });

      // check for duplicate urls
      var urls = {};
      const uniqueUrls = locations.filter(function (item) {
        return urls.hasOwnProperty(item) ? false : (urls[item] = true);
      });

      return Promise.all(
        uniqueUrls.map((slug) => {
          return fetch(`https://www.baseball-reference.com${slug}`);
        })
      );
    })
    .then((playerPages) => {
      return playerPages
        .map((page) => {
          return parse(page);
        })
        .filter((parsedPlayer) => parsedPlayer);
    });
};

module.exports = search;
