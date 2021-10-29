import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { GradingCompanyActionTypes } from "./types";
import * as actions from "./actions";
import { get } from "../../../utils/fetch";

export const fetchAllGradingCompanies =
  (): ThunkAction<void, RootState, unknown, GradingCompanyActionTypes> => (dispatch) => {
    dispatch(actions.getAllGradingCompaniesRequest());
    get("/api/grading_companies", dispatch)
      .then((gradingComps) => {
        dispatch(actions.getAllGradingCompaniesSuccess(gradingComps));
      })
      .catch((error) => {
        dispatch(actions.getAllGradingCompaniesFailure());
      });
  };
