export default function sortCardNumbers(
  cardNumA: string,
  cardNumB: string
): number {
  // check if card number can convert to number
  if (!isNaN(+cardNumA) && !isNaN(+cardNumB)) {
    return +cardNumA - +cardNumB;
  }

  // check if card number ends or starts in number(s) and sort numerically
  const matchesA = Array.from(cardNumA.matchAll(/\d+/g));
  const matchesB = Array.from(cardNumB.matchAll(/\d+/g));
  if (matchesA.length > 0 && matchesB.length > 0) {
    if (matchesA[matchesA.length - 1] !== matchesB[matchesB.length - 1]) {
      return +matchesA[matchesA.length - 1] - +matchesB[matchesB.length - 1];
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
