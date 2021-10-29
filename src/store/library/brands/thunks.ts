import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { BrandActionTypes } from "./types";
import { get } from "../../../utils/fetch";
import { check401 } from "../../index";

export const fetchAllBrands =
  (): ThunkAction<void, RootState, unknown, BrandActionTypes> => (dispatch) => {
    dispatch(actions.getBrandsRequest());
    get("/api/brands")
      .then((allBrands) => {
        dispatch(actions.getBrandsSuccess(allBrands));
      })
      .catch((error) => {
        if (check401(error, dispatch)) {
          dispatch(actions.getBrandsFailure());
        }
      });
  };
