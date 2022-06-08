import { Filters } from "./types";
import { Set } from "../../../store/library/sets/types";
import { Subset } from "../../../store/library/subsets/types";
import { League } from "../../../store/library/leagues/types";
import { getSetName } from "./columns";

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
  subset: Subset,
  sports: League[]
): ReturnValue {
  let query = "";
  let bubbles: Array<{
    name: string;
    filter: string;
  }> = [];

  if (filters.player !== "") {
    query += `&playerId=${filters.player.slice(
      0,
      filters.player.indexOf("-")
    )}`;
    bubbles.push({
      name: "Player",
      filter: filters.player.slice(filters.player.indexOf("-") + 1),
    });
  }
  if (filters.teamId !== "") {
    query += `&teamId=${filters.teamId.slice(0, filters.teamId.indexOf("-"))}`;
    bubbles.push({
      name: "Team",
      filter: filters.teamId.slice(filters.teamId.indexOf("-") + 1),
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
      name: "Short Print",
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
  if (filters.graded !== 0) {
    query += `&graded=${filters.graded === 1 ? "true" : "false"}`;
    bubbles.push({
      name: "Graded",
      filter: filters.graded === 1 ? "True" : "False",
    });
  }

  // only add one of set, subset, or series id (whichever is most specific)
  if (filters.seriesId !== 0) {
    query += `&seriesId=${filters.seriesId}`;
    bubbles.push({
      name: "Parallel",
      filter: `${set.name} ${subset.name} ${
        subset.series.find((ser) => ser.id === filters.seriesId)!.name
      }`,
    });
  } else if (filters.subsetId !== 0) {
    query += `&subsetId=${filters.subsetId}`;
    bubbles.push({
      name: "Subset",
      filter: `${set.name} ${subset.name}`,
    });
  } else if (filters.setId !== 0) {
    query += `&setId=${filters.setId}`;
    bubbles.push({
      name: "Set",
      filter: set.name,
    });
  } else if (filters.year !== 0) {
    query += `&year=${filters.year}`;
    bubbles.push({
      name: "Year",
      filter: String(filters.year),
    });
  }
  if (filters.sportId !== 0) {
    query += `&sportId=${filters.sportId}`;
  }

  if (filters.sportId !== 0) {
    const sport = sports.find((s) => s.id === filters.sportId)!;
    bubbles.push({
      name: "Sport",
      filter: sport.name,
    });
  }

  return { query, bubbles };
}
