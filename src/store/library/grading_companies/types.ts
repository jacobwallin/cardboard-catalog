// STATE
export interface GradingCompany {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// ACTION TYPES
export const GET_ALL_GRADING_COMPANIES_REQUEST =
  "GET_ALL_GRADING_COMPANIES_REQUEST";
export const GET_ALL_GRADING_COMPANIES_SUCCESS =
  "GET_ALL_GRADING_COMPANIES_SUCCESS";
export const GET_ALL_GRADING_COMPANIES_FAILURE =
  "GET_ALL_GRADING_COMPANIES_FAILURE";

// ACTION CREATORS
interface GetAllGradingCompaniesRequest {
  type: typeof GET_ALL_GRADING_COMPANIES_REQUEST;
}
interface GetAllGradingCompaniesSuccess {
  type: typeof GET_ALL_GRADING_COMPANIES_SUCCESS;
  gradingCompanies: GradingCompany[];
}
interface GetAllGradingCompaniesFailure {
  type: typeof GET_ALL_GRADING_COMPANIES_FAILURE;
}

export type GradingCompanyActionTypes =
  | GetAllGradingCompaniesRequest
  | GetAllGradingCompaniesSuccess
  | GetAllGradingCompaniesFailure;
