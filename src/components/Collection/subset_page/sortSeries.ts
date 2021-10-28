import { Series } from "../../../store/library/subsets/types";

export default function sortSeries(seriesA: Series, seriesB: Series, baseSeriesId: number) {
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
