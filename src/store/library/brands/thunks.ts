import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { getBrandsRequest, getBrandsSuccess } from "./actions";
import { BrandActionTypes } from "./types";

export const fetchBrands = (): ThunkAction<
  void,
  RootState,
  unknown,
  BrandActionTypes
> => (dispatch) => {
  dispatch(getBrandsRequest());
  fetch("/api/brands")
    .then((response) => {
      return response.json();
    })
    .then((allBrands) => {
      dispatch(getBrandsSuccess(allBrands));
    })
    .catch((error) => console.log("ERROR IN FETCH BRANDS THUNK"));
};
