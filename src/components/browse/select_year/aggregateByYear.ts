import { SetSummary } from "../../../store/library/sets/types";

export interface TableRow {
  year: number;
}

export default function aggregateByYear(sets: SetSummary[]): TableRow[] {
  const years = sets.reduce((years: { [key: string]: boolean }, set) => {
    const setYear = set.year;
    if (!years[setYear]) {
      years[setYear] = true;
    }
    return years;
  }, {});

  return Object.keys(years)
    .sort()
    .reverse()
    .map((yearString) => ({ year: +yearString }));
}
