const parse = (response) => {
  // find locations of data
  let birthdayIdx = response.webpage.indexOf("data-birth=");
  let nameIdx = response.webpage.indexOf('itemprop="name">\n\t\t');
  let nameEnd = response.webpage.slice(nameIdx).indexOf("</span>");
  let fullNameIdx = response.webpage.indexOf("Full Name:");
  let fullNameEnd = response.webpage.slice(fullNameIdx).indexOf("</p>");

  // make sure data was found
  if (
    birthdayIdx === -1 ||
    nameIdx === -1 ||
    nameEnd === -1 ||
    fullNameIdx === -1 ||
    fullNameEnd === -1
  ) {
    return undefined;
  }

  // slice out values
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

  return { name, fullName, birthday, hallOfFame, url: response.url };
};

module.exports = parse;
