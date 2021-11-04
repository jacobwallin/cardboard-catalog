export default function (cardNumA: string, cardNumB: string): number {
  // check if card number can convert to number
  if (!isNaN(+cardNumA) && !isNaN(+cardNumB)) {
    return +cardNumA - +cardNumB;
  }

  // check if card number ends or starts in number(s) and sort numerically
  const matchesA = cardNumA.match(/^\d+/) || cardNumA.match(/\d+$/);
  const matchesB = cardNumB.match(/^\d+/) || cardNumB.match(/\d+$/);
  if (matchesA && matchesB) {
    if (matchesA[0] !== matchesB[0]) {
      return +matchesA[0] - +matchesB[0];
    } else {
      // if extracted numbers are equal, get only the string portion and compare that
      let aRegex = new RegExp(matchesA[0]);
      let bRegex = new RegExp(matchesB[0]);
      cardNumA = cardNumA.replace(aRegex, "");
      cardNumB = cardNumB.replace(bRegex, "");
    }
  }

  // if number is not a number or ending in number(s), compare as strings
  if (cardNumA < cardNumB) {
    return -1;
  } else if (cardNumA > cardNumB) {
    return 1;
  }
  return 0;
}
