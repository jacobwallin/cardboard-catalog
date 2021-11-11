import { Filters } from "./types";

export default function generateQuery(filters: Filters): string {
  let query = "";

  if (filters.playerId !== 0) query += `&playerId=${filters.playerId}`;
  if (filters.auto !== 0)
    query += `&auto=${filters.auto === 1 ? "true" : "false"}`;
  if (filters.relic !== 0)
    query += `&relic=${filters.relic === 1 ? "true" : "false"}`;
  if (filters.shortPrint !== 0)
    query += `&short-print=${filters.shortPrint === 1 ? "true" : "false"}`;
  if (filters.parallel !== 0)
    query += `&parallel=${filters.parallel === 1 ? "true" : "false"}`;
  if (filters.refractor !== 0)
    query += `&refractor=${filters.refractor === 1 ? "true" : "false"}`;
  if (filters.manufacturedRelic !== 0)
    query += `&man-relic=${filters.manufacturedRelic === 1 ? "true" : "false"}`;
  if (filters.rookie !== 0)
    query += `&rookie=${filters.rookie === 1 ? "true" : "false"}`;
  if (filters.serialized !== 0)
    query += `&serialized=${filters.serialized === 1 ? "true" : "false"}`;
  if (filters.hallOfFame !== 0)
    query += `&hof=${filters.hallOfFame === 1 ? "true" : "false"}`;

  // only add one of set, subset, or series id (whichever is most specific)
  if (filters.seriesId !== 0) {
    query += `&seriesId=${filters.seriesId}`;
  } else if (filters.subsetId !== 0) {
    query += `&subsetId=${filters.seriesId}`;
  } else if (filters.setId !== 0) {
    query += `&setId=${filters.seriesId}`;
  }
  if (filters.year !== 0) query += `&year=${filters.year}`;

  return query;
}
