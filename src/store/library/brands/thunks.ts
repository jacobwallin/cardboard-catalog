import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { BrandActionTypes } from "./types";
import { get } from "../../../utils/fetch";

export const fetchAllBrands =
  (): ThunkAction<void, RootState, unknown, BrandActionTypes> => (dispatch) => {
    dispatch(actions.getBrandsRequest());
    get("/api/brands", dispatch)
      .then((allBrands) => {
        dispatch(actions.getBrandsSuccess(allBrands));
      })
      .catch((error) => {
        dispatch(actions.getBrandsFailure());
      });
  };
