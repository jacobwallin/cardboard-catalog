import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { GradingCompanyActionTypes } from "./types";
import {
  getAllGradingCompaniesRequest,
  getAllGradingCompaniesSuccess,
} from "./actions";

export const fetchAllGradingCompanies = (): ThunkAction<
  void,
  RootState,
  unknown,
  GradingCompanyActionTypes
> => (dispatch) => {
  dispatch(getAllGradingCompaniesRequest());
  fetch("/api/grading_companies")
    .then((response) => {
      return response.json();
    })
    .then((gradingComps) => {
      dispatch(getAllGradingCompaniesSuccess(gradingComps));
    })
    .catch((error) => console.log("ERROR IN FETCH GRADING COMPANIES THUNK"));
};
