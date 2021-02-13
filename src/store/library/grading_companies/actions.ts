import {
  GET_ALL_GRADING_COMPANIES_REQUEST,
  GET_ALL_GRADING_COMPANIES_SUCCESS,
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
