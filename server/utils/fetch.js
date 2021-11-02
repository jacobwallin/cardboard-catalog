const https = require("https");

const fetch = (url) => {
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
            statusCode: resp.statusCode,
            location: resp.headers.location,
          });
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

module.exports = fetch;
