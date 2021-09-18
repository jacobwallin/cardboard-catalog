import {
  GET_ALL_GRADING_COMPANIES_REQUEST,
  GET_ALL_GRADING_COMPANIES_SUCCESS,
  GET_ALL_GRADING_COMPANIES_FAILURE,
  GradingCompanyActionTypes,
  GradingCompany,
} from "./types";

export const getAllGradingCompaniesRequest = (): GradingCompanyActionTypes => ({
  type: GET_ALL_GRADING_COMPANIES_REQUEST,
});

export const getAllGradingCompaniesSuccess = (
  gradingCompanies: GradingCompany[]
): GradingCompanyActionTypes => ({
  type: GET_ALL_GRADING_COMPANIES_SUCCESS,
  gradingCompanies,
});

export const getAllGradingCompaniesFailure = (): GradingCompanyActionTypes => ({
  type: GET_ALL_GRADING_COMPANIES_FAILURE,
});
