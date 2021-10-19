import { SetSummary } from "../../../store/library/sets/types";

export interface TableRow {
  year: number;
}

export default function aggregateByYear(sets: SetSummary[]): TableRow[] {
  const years = sets.reduce((years: { [key: string]: boolean }, set) => {
    const setYear = set.release_date.slice(0, 4);
    if (!years[setYear]) {
      years[setYear] = true;
    }
    return years;
  }, {});

  return Object.keys(years)
    .sort()
    .map((yearString) => ({ year: +yearString }));
}
