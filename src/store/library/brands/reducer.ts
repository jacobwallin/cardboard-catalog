import * as types from "./types";

const initialState = {
  allBrands: [],
};

export default function brandReducer(
  state: types.BrandsState = initialState,
  action: types.BrandActionTypes
) {
  switch (action.type) {
    case types.GET_BRANDS_SUCCESS:
      return { ...state, allBrands: action.allBrands };
    case types.CREATE_BRAND_SUCCESS:
      return {
        ...state,
        allBrands: [...state.allBrands, action.brand],
      };
    case types.UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        allBrands: state.allBrands.map((b) => {
          if (b.id === action.brand.id) {
            return action.brand;
          }
          return b;
        }),
      };
    default:
      return state;
  }
}
