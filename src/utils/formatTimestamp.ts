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

const months: { [k: number]: string } = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export function convertDateString(dateStr: string): string {
  const splitDate = dateStr.split(/[-]/);
  return getFullDateString(
    new Date(+splitDate[0], +splitDate[1] - 1, +splitDate[2])
  );
}

export function getFullDateString(date: Date): string {
  return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}
