import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { GradingCompanyActionTypes, GradingCompany } from "./types";
import * as actions from "./actions";
import { get, post, put } from "../../../utils/fetch";

export const fetchAllGradingCompanies =
  (): ThunkAction<void, RootState, unknown, GradingCompanyActionTypes> =>
  (dispatch) => {
    dispatch(actions.getAllGradingCompaniesRequest());
    get("/api/grading_companies", dispatch)
      .then((gradingComps) => {
        dispatch(actions.getAllGradingCompaniesSuccess(gradingComps));
      })
      .catch((error) => {
        dispatch(actions.getAllGradingCompaniesFailure());
      });
  };
export const createGradingCompany =
  (companyData: {
    name: String;
  }): ThunkAction<void, RootState, unknown, GradingCompanyActionTypes> =>
  (dispatch) => {
    dispatch(actions.createGradingCompanyRequest());
    post("/api/grading_companies", companyData, dispatch)
      .then((company: GradingCompany) => {
        dispatch(actions.createGradingCompanySuccess(company));
      })
      .catch((error) => {
        dispatch(actions.createGradingCompanyFailure());
      });
  };
export const updateGradingCompany =
  (
    companyId: number,
    companyData: {
      name: String;
    }
  ): ThunkAction<void, RootState, unknown, GradingCompanyActionTypes> =>
  (dispatch) => {
    dispatch(actions.updateGradingCompanyRequest());
    put(`/api/grading_companies/${companyId}`, companyData, dispatch)
      .then((gradingComps) => {
        dispatch(actions.updateGradingCompanySuccess(gradingComps));
      })
      .catch((error) => {
        dispatch(actions.updateGradingCompanyFailure());
      });
  };
