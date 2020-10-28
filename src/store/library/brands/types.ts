export const GET_BRANDS_REQUEST = "GET_BRANDS_REQUEST";
export const GET_BRANDS_SUCCESS = "GET_BRANDS_SUCCESS";

interface GetBrandsRequest {
  type: typeof GET_BRANDS_REQUEST;
}
interface GetBrandsSuccess {
  type: typeof GET_BRANDS_SUCCESS;
  allBrands: Brand[];
}

export type BrandActionTypes = GetBrandsRequest | GetBrandsSuccess;

export interface BrandsState {
  allBrands: Brand[];
}
export interface Brand {
  id: number;
  name: string;
}
