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

export type BrandActionTypes =
  | GetBrandsRequest
  | GetBrandsSuccess
  | GetBrandsFailure;
