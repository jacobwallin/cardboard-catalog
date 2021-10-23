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

const scrapePlayerData = (url) => {
  return fetchData(url).then((response) => {
    let birthdayIdx = response.webpage.indexOf("data-birth=");
    let nameIdx = response.webpage.indexOf('itemprop="name">\n\t\t');
    let nameEnd = response.webpage.slice(nameIdx).indexOf("</span>");
    let fullNameIdx = response.webpage.indexOf("Full Name:");
    let fullNameEnd = response.webpage.slice(fullNameIdx).indexOf("</p>");
    const birthday = response.webpage.slice(birthdayIdx + 12, birthdayIdx + 22);
    const name = response.webpage
      .slice(nameIdx + 25, nameIdx + nameEnd)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    let hallOfFame = response.webpage.indexOf("Inducted") !== -1;
    const fullName = response.webpage.slice(
      fullNameIdx + 20,
      fullNameIdx + fullNameEnd - 2
    );

    console.log("SCRAPE! ", name, fullName);
    return { name, fullName, birthday, hallOfFame, url };
  });
};

module.exports = scrapePlayerData;
