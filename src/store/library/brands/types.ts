// STATE
export interface BrandsState {
  allBrands: Brand[];
}
export interface Brand {
  id: number;
  name: string;
}

// ACTION TYPES
export const GET_BRANDS_REQUEST = "GET_BRANDS_REQUEST";
export const GET_BRANDS_SUCCESS = "GET_BRANDS_SUCCESS";
export const GET_BRANDS_FAILURE = "GET_BRANDS_FAILURE";
export const CREATE_BRAND_REQUEST = "CREATE_BRAND_REQUEST";
export const CREATE_BRAND_SUCCESS = "CREATE_BRAND_SUCCESS";
export const CREATE_BRAND_FAILURE = "CREATE_BRAND_FAILURE";
export const UPDATE_BRAND_REQUEST = "UPDATE_BRAND_REQUEST";
export const UPDATE_BRAND_SUCCESS = "UPDATE_BRAND_SUCCESS";
export const UPDATE_BRAND_FAILURE = "UPDATE_BRAND_FAILURE";

// ACTION CREATORS
interface GetBrandsRequest {
  type: typeof GET_BRANDS_REQUEST;
}
interface GetBrandsSuccess {
  type: typeof GET_BRANDS_SUCCESS;
  allBrands: Brand[];
}
interface GetBrandsFailure {
  type: typeof GET_BRANDS_FAILURE;
}

interface CreateBrandRequest {
  type: typeof CREATE_BRAND_REQUEST;
}
interface CreateBrandSuccess {
  type: typeof CREATE_BRAND_SUCCESS;
  brand: Brand;
}
interface CreateBrandFailure {
  type: typeof CREATE_BRAND_FAILURE;
}

interface UpdateBrandRequest {
  type: typeof UPDATE_BRAND_REQUEST;
}
interface UpdateBrandSuccess {
  type: typeof UPDATE_BRAND_SUCCESS;
  brand: Brand;
}
interface UpdateBrandFailure {
  type: typeof UPDATE_BRAND_FAILURE;
}

export type BrandActionTypes =
  | GetBrandsRequest
  | GetBrandsSuccess
  | GetBrandsFailure
  | CreateBrandRequest
  | CreateBrandSuccess
  | CreateBrandFailure
  | UpdateBrandRequest
  | UpdateBrandSuccess
  | UpdateBrandFailure;
