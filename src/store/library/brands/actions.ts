import {
  GET_BRANDS_REQUEST,
  GET_BRANDS_SUCCESS,
  BrandActionTypes,
  Brand,
} from "./types";

export const getBrandsRequest = (): BrandActionTypes => ({
  type: GET_BRANDS_REQUEST,
});

export const getBrandsSuccess = (allBrands: Brand[]): BrandActionTypes => ({
  type: GET_BRANDS_SUCCESS,
  allBrands,
});
