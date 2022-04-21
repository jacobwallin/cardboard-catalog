import { SetSummary } from "../../../store/library/sets/types";
import { Brand } from "../../../store/library/brands/types";

export interface FilterValues {
  years: number[];
  brands: Brand[];
}

export function aggregateFilterValues(
  sets: SetSummary[],
  yearFilter: number
): FilterValues {
  let filteredSets = sets.filter(
    (s) => yearFilter === 0 || s.year === yearFilter
  );

  const years = sets.reduce((uniqueYears: number[], set) => {
    if (uniqueYears.findIndex((year) => year === set.year) === -1) {
      uniqueYears.push(set.year);
    }
    return uniqueYears;
  }, []);
  const brands = filteredSets
    .reduce((uniqueBrands: Brand[], set) => {
      if (uniqueBrands.findIndex((brand) => brand.id === set.brandId) === -1) {
        uniqueBrands.push(set.brand);
      }
      return uniqueBrands;
    }, [])
    .sort((brandA, brandB) => {
      if (brandA.name < brandB.name) return -1;
      return 1;
    });

  return {
    years,
    brands,
  };
}

export function filterSets(
  sets: SetSummary[],
  yearFilter: number,
  brandFilter: number
) {
  return sets
    .filter((s) => yearFilter === 0 || s.year === yearFilter)
    .filter((s) => brandFilter === 0 || s.brandId === brandFilter);
}
