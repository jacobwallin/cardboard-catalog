import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import {
  getBrandsRequest,
  getBrandsSuccess,
  getBrandsFailure,
} from "./actions";
import { BrandActionTypes } from "./types";

export const fetchAllBrands =
  (): ThunkAction<void, RootState, unknown, BrandActionTypes> => (dispatch) => {
    dispatch(getBrandsRequest());
    fetch("/api/brands")
      .then((response) => {
        return response.json();
      })
      .then((allBrands) => {
        dispatch(getBrandsSuccess(allBrands));
      })
      .catch((error) => dispatch(getBrandsFailure()));
  };
