export default function (cardNumA: string, cardNumB: string): number {
  // check if card number can convert to number
  if (!isNaN(+cardNumA) && !isNaN(+cardNumB)) {
    return +cardNumA - +cardNumB;
  }

  // check if card number ends in number(s) and sort numerically
  const matchesA = cardNumA.match(/\d+$/);
  const matchesB = cardNumB.match(/\d+$/);
  if (matchesA && matchesB) {
    return +matchesA[0] - +matchesB[0];
  }

  // if number is not a number or ending in number(s), compare as strings
  if (cardNumA < cardNumB) {
    return -1;
  } else if (cardNumA > cardNumB) {
    return 1;
  }
  return 0;
}
