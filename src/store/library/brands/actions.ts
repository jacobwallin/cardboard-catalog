import * as types from "./types";

// get brands
export const getBrandsRequest = (): types.BrandActionTypes => ({
  type: types.GET_BRANDS_REQUEST,
});

export const getBrandsSuccess = (
  allBrands: types.Brand[]
): types.BrandActionTypes => ({
  type: types.GET_BRANDS_SUCCESS,
  allBrands,
});

export const getBrandsFailure = (): types.BrandActionTypes => ({
  type: types.GET_BRANDS_FAILURE,
});

// create brand
export const createBrandRequest = (): types.BrandActionTypes => ({
  type: types.CREATE_BRAND_REQUEST,
});
export const createBrandSuccess = (
  brand: types.Brand
): types.BrandActionTypes => ({
  type: types.CREATE_BRAND_SUCCESS,
  brand,
});
export const createBrandFailure = (): types.BrandActionTypes => ({
  type: types.CREATE_BRAND_FAILURE,
});

// update brand
export const updateBrandRequest = (): types.BrandActionTypes => ({
  type: types.UPDATE_BRAND_REQUEST,
});
export const updateBrandSuccess = (
  brand: types.Brand
): types.BrandActionTypes => ({
  type: types.UPDATE_BRAND_SUCCESS,
  brand,
});
export const updateBrandFailure = (): types.BrandActionTypes => ({
  type: types.UPDATE_BRAND_FAILURE,
});
