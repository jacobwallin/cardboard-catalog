const https = require("https");

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
          resolve({
            webpage: data,
            url,
          });
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const scrapeCardData = (url) => {
  return fetchData(url).then((response) => {
    const { webpage } = response;

    // find card table
    const tableStart = webpage.indexOf("ViewCard.cfm");
    const tableEnd = webpage.indexOf("</tbody>");
    const table = webpage.slice(tableStart, tableEnd);

    // split table data into blocks
    const cardRows = table.split("</tr>");

    let cardData = cardRows.map((row) => {
      let rowCopy = row;
      // crawl to card number
      let numberStart = rowCopy.lastIndexOf("ViewCard.cfm");
      rowCopy = rowCopy.slice(numberStart);
      numberStart = rowCopy.indexOf(">") + 1;
      const numberEnd = rowCopy.indexOf("<");
      const number = rowCopy.slice(numberStart, numberEnd).trim();

      // crawl to name
      let nameStart = 0;
      let attributes = [];
      let player = false;
      if (rowCopy.indexOf("Person.cfm") !== -1) {
        player = true;
        nameStart = rowCopy.indexOf("Person.cfm");
        rowCopy = rowCopy.slice(nameStart);
        nameStart = rowCopy.indexOf(">") + 1;

        // find attributes if present
        let attStart = rowCopy.indexOf("a>") + 3;
        let attEnd = rowCopy.indexOf("</td");
        if (rowCopy.indexOf("figcaption") !== -1) {
          attEnd = rowCopy.indexOf("<br");
        }
        if (attStart !== attEnd) {
          let att = rowCopy.slice(attStart, attEnd);
          attributes = att.split(",").map((att) => att.trim());
        }
      } else {
        nameStart = rowCopy.indexOf("<td");
        rowCopy = rowCopy.slice(nameStart + 3);
        nameStart = rowCopy.indexOf("<td");
        rowCopy = rowCopy.slice(nameStart + 3);
        nameStart = rowCopy.indexOf(">") + 1;
      }
      const nameEnd = rowCopy.indexOf("<");
      const name = rowCopy.slice(nameStart, nameEnd).trim();

      let comment = "";
      let commentStart = rowCopy.indexOf("figcaption");
      if (commentStart !== -1) {
        rowCopy = rowCopy.slice(commentStart);
        commentStart = rowCopy.indexOf(">") + 1;
        let commentEnd = rowCopy.indexOf("<");
        comment = rowCopy.slice(commentStart, commentEnd).trim();
      }

      let team = "";
      if (rowCopy.indexOf("Team.cfm") !== -1) {
        let teamStart = rowCopy.indexOf("Team.cfm");
        rowCopy = rowCopy.slice(teamStart);
        teamStart = rowCopy.indexOf(">") + 1;
        let teamEnd = rowCopy.indexOf("<");
        team = rowCopy.slice(teamStart, teamEnd).trim();
      }

      return {
        number,
        name,
        player,
        team,
        comment,
        attributes,
      };
    });

    cardData = cardData.filter((data) => data.number !== "");

    return { cardData };
  });
};

module.exports = scrapeCardData;
