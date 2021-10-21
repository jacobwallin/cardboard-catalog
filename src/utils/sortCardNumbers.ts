export default function (cardNumA: string, cardNumB: string): number {
  if (+cardNumA && +cardNumB) {
    return +cardNumA - +cardNumB;
  }
  if (cardNumA < cardNumB) {
    return 1;
  } else if (cardNumA > cardNumB) {
    return -1;
  }
  return 0;
}
