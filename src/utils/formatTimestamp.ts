export default function formatTimestamp(timestamp: string): string {
  // Split timestamp into [ Y, M, D, h, m, s ]
  var splitTimestamp = timestamp.split(/[- :T.]/);

  // Apply each element to the Date function
  var date = new Date(
    +splitTimestamp[0],
    +splitTimestamp[1] - 1,
    +splitTimestamp[2],
    +splitTimestamp[3],
    +splitTimestamp[4],
    +splitTimestamp[5].slice(0, splitTimestamp[5].length - 1)
  );

  return getDateString(date);
}

export function getDateString(date: Date): string {
  // add trailing zero and adjust for zero indexed month
  const month = `0${date.getMonth() + 1}`;

  // return yyyy/mm/dd
  return `${date.getFullYear()}-${month.slice(-2)}-${date.getDate()}`;
}
