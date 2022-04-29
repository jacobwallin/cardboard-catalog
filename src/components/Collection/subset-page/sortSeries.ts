import { CondensedSeriesInstance } from "../../../store/library/series/types";

export default function sortSeries(
  seriesA: CondensedSeriesInstance,
  seriesB: CondensedSeriesInstance,
  baseSeriesId: number
) {
  if (seriesA.id === baseSeriesId) return -1;
  if (seriesB.id === baseSeriesId) return 1;

  let aSer = seriesA.serialized || Infinity;
  let bSer = seriesB.serialized || Infinity;
  if (aSer < bSer) return 1;
  if (aSer > bSer) return -1;

  if (seriesA.name < seriesB.name) return -1;
  if (seriesA.name > seriesB.name) return 1;
  return 0;
}
