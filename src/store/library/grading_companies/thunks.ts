import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { GradingCompanyActionTypes } from "./types";
import * as actions from "./actions";

export const fetchAllGradingCompanies =
  (): ThunkAction<void, RootState, unknown, GradingCompanyActionTypes> =>
  (dispatch) => {
    dispatch(actions.getAllGradingCompaniesRequest());
    fetch("/api/grading_companies")
      .then((response) => {
        return response.json();
      })
      .then((gradingComps) => {
        dispatch(actions.getAllGradingCompaniesSuccess(gradingComps));
      })
      .catch((error) => dispatch(actions.getAllGradingCompaniesFailure()));
  };
