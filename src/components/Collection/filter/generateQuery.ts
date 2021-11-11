import { Filters } from "./types";
import { Set } from "../../../store/library/sets/types";
import { SubsetState } from "../../../store/library/subsets/types";

interface ReturnValue {
  query: string;
  bubbles: Array<{
    name: string;
    filter: string;
  }>;
}

export default function generateQuery(
  filters: Filters,
  set: Set,
  subset: SubsetState
): ReturnValue {
  let query = "";
  let bubbles: Array<{
    name: string;
    filter: string;
  }> = [];

  if (filters.player !== "") {
    console.log("PLAYER: ", filters.player);
    query += `&playerId=${filters.player.slice(
      0,
      filters.player.indexOf("-")
    )}`;
    bubbles.push({
      name: "Player",
      filter: filters.player.slice(filters.player.indexOf("-") + 1),
    });
  }
  if (filters.auto !== 0) {
    query += `&auto=${filters.auto === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "Auto",
      filter: filters.auto === 1 ? "True" : "False",
    });
  }

  if (filters.relic !== 0) {
    query += `&relic=${filters.relic === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "Relic",
      filter: filters.relic === 1 ? "True" : "False",
    });
  }
  if (filters.shortPrint !== 0) {
    query += `&short-print=${filters.shortPrint === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "Short Pring",
      filter: filters.shortPrint === 1 ? "True" : "False",
    });
  }
  if (filters.parallel !== 0) {
    query += `&parallel=${filters.parallel === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "Parallel",
      filter: filters.parallel === 1 ? "True" : "False",
    });
  }
  if (filters.refractor !== 0) {
    query += `&refractor=${filters.refractor === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "Refractor",
      filter: filters.refractor === 1 ? "True" : "False",
    });
  }
  if (filters.manufacturedRelic !== 0) {
    query += `&man-relic=${filters.manufacturedRelic === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "Man. Relic",
      filter: filters.manufacturedRelic === 1 ? "True" : "False",
    });
  }
  if (filters.rookie !== 0) {
    query += `&rookie=${filters.rookie === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "Rookie",
      filter: filters.rookie === 1 ? "True" : "False",
    });
  }
  if (filters.serialized !== 0) {
    query += `&serialized=${filters.serialized === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "Serialized",
      filter: filters.serialized === 1 ? "True" : "False",
    });
  }
  if (filters.hallOfFame !== 0) {
    query += `&hof=${filters.hallOfFame === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "HOF",
      filter: filters.hallOfFame === 1 ? "True" : "False",
    });
  }

  // only add one of set, subset, or series id (whichever is most specific)
  if (filters.seriesId !== 0) {
    query += `&seriesId=${filters.seriesId}`;
  } else if (filters.subsetId !== 0) {
    query += `&subsetId=${filters.subsetId}`;
  } else if (filters.setId !== 0) {
    query += `&setId=${filters.setId}`;
  } else if (filters.year !== 0) {
    query += `&year=${filters.year}`;
  }

  if (filters.year !== 0) {
    bubbles.push({
      name: "Year",
      filter: String(filters.year),
    });
  }
  if (filters.setId !== 0) {
    bubbles.push({
      name: "Set",
      filter: set.name,
    });
  }
  if (filters.subsetId !== 0) {
    bubbles.push({
      name: "Subset",
      filter: subset.name,
    });
  }
  if (filters.seriesId !== 0) {
    bubbles.push({
      name: "Parallel",
      filter: subset.series.find((ser) => ser.id === filters.seriesId)!.name,
    });
  }
  return { query, bubbles };
}
