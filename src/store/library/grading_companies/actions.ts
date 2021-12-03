import * as types from "./types";

// get companies
export const getAllGradingCompaniesRequest =
  (): types.GradingCompanyActionTypes => ({
    type: types.GET_ALL_GRADING_COMPANIES_REQUEST,
  });

export const getAllGradingCompaniesSuccess = (
  gradingCompanies: types.GradingCompany[]
): types.GradingCompanyActionTypes => ({
  type: types.GET_ALL_GRADING_COMPANIES_SUCCESS,
  gradingCompanies,
});

export const getAllGradingCompaniesFailure =
  (): types.GradingCompanyActionTypes => ({
    type: types.GET_ALL_GRADING_COMPANIES_FAILURE,
  });

// create company
export const createGradingCompanyRequest =
  (): types.GradingCompanyActionTypes => ({
    type: types.CREATE_GRADING_COMPANY_REQUEST,
  });
export const createGradingCompanySuccess = (
  company: types.GradingCompany
): types.GradingCompanyActionTypes => ({
  type: types.CREATE_GRADING_COMPANY_SUCCESS,
  company,
});
export const createGradingCompanyFailure =
  (): types.GradingCompanyActionTypes => ({
    type: types.CREATE_GRADING_COMPANY_FAILURE,
  });

// update company
export const updateGradingCompanyRequest =
  (): types.GradingCompanyActionTypes => ({
    type: types.UPDATE_GRADING_COMPANY_REQUEST,
  });
export const updateGradingCompanySuccess = (
  company: types.GradingCompany
): types.GradingCompanyActionTypes => ({
  type: types.UPDATE_GRADING_COMPANY_SUCCESS,
  company,
});
export const updateGradingCompanyFailure =
  (): types.GradingCompanyActionTypes => ({
    type: types.UPDATE_GRADING_COMPANY_FAILURE,
  });
