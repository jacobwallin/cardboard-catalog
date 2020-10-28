import { BrandsState, BrandActionTypes, GET_BRANDS_SUCCESS } from "./types";

const initialState = {
  allBrands: [],
};

export default function brandReducer(
  state: BrandsState = initialState,
  action: BrandActionTypes
) {
  switch (action.type) {
    case GET_BRANDS_SUCCESS:
      return { ...state, allBrands: action.allBrands };
    default:
      return state;
  }
}
