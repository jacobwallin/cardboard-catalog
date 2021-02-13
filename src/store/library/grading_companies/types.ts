export const GET_ALL_GRADING_COMPANIES_REQUEST =
  "GET_ALL_GRADING_COMPANIES_REQUEST";
export const GET_ALL_GRADING_COMPANIES_SUCCESS =
  "GET_ALL_GRADING_COMPANIES_SUCCESS";

interface GetAllGradingCompaniesRequest {
  type: typeof GET_ALL_GRADING_COMPANIES_REQUEST;
}

interface GetAllGradingCompaniesSuccess {
  type: typeof GET_ALL_GRADING_COMPANIES_SUCCESS;
  gradingCompanies: GradingCompany[];
}

export type GradingCompanyActionTypes =
  | GetAllGradingCompaniesRequest
  | GetAllGradingCompaniesSuccess;

export interface GradingCompany {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
