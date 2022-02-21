import { SetSummary } from "../../../store/library/sets/types";
import { Brand } from "../../../store/library/brands/types";

export interface Return {
  years: number[];
  brands: Brand[];
}

export default function aggregate(sets: SetSummary[]): Return {
  const years = sets.reduce((uniqueYears: number[], set) => {
    if (uniqueYears.findIndex((year) => year === set.year) === -1) {
      uniqueYears.push(set.year);
    }
    return uniqueYears;
  }, []);
  const brands = sets.reduce((uniqueBrands: Brand[], set) => {
    if (uniqueBrands.findIndex((brand) => brand.id === set.brandId) === -1) {
      uniqueBrands.push(set.brand);
    }
    return uniqueBrands;
  }, []);

  return {
    years,
    brands,
  };
}
