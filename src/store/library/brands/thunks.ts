import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { BrandActionTypes, Brand } from "./types";
import { get, post, put } from "../../../utils/fetch";

export const fetchAllBrands =
  (): ThunkAction<void, RootState, unknown, BrandActionTypes> => (dispatch) => {
    dispatch(actions.getBrandsRequest());
    get("/api/brands", dispatch)
      .then((allBrands: Brand[]) => {
        dispatch(actions.getBrandsSuccess(allBrands));
      })
      .catch((error) => {
        dispatch(actions.getBrandsFailure());
      });
  };
export const createBrand =
  (brandData: {
    name: string;
  }): ThunkAction<void, RootState, unknown, BrandActionTypes> =>
  (dispatch) => {
    dispatch(actions.createBrandRequest());
    post("/api/brands", brandData, dispatch)
      .then((brand: Brand) => {
        dispatch(actions.createBrandSuccess(brand));
      })
      .catch((error) => {
        dispatch(actions.createBrandFailure());
      });
  };
export const updateBrand =
  (
    brandId: number,
    brandData: {
      name: string;
    }
  ): ThunkAction<void, RootState, unknown, BrandActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateBrandRequest());
    put(`/api/brands/${brandId}`, brandData, dispatch)
      .then((brand: Brand) => {
        dispatch(actions.updateBrandSuccess(brand));
      })
      .catch((error) => {
        dispatch(actions.updateBrandFailure());
      });
  };
