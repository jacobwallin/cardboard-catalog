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
export const CREATE_GRADING_COMPANY_REQUEST = "CREATE_GRADING_COMPANY_REQUEST";
export const CREATE_GRADING_COMPANY_SUCCESS = "CREATE_GRADING_COMPANY_SUCCESS";
export const CREATE_GRADING_COMPANY_FAILURE = "CREATE_GRADING_COMPANY_FAILURE";
export const UPDATE_GRADING_COMPANY_REQUEST = "UPDATE_GRADING_COMPANY_REQUEST";
export const UPDATE_GRADING_COMPANY_SUCCESS = "UPDATE_GRADING_COMPANY_SUCCESS";
export const UPDATE_GRADING_COMPANY_FAILURE = "UPDATE_GRADING_COMPANY_FAILURE";

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

interface CreateGradingCompanyRequest {
  type: typeof CREATE_GRADING_COMPANY_REQUEST;
}
interface CreateGradingCompanySuccess {
  type: typeof CREATE_GRADING_COMPANY_SUCCESS;
  company: GradingCompany;
}
interface CreateGradingCompanyFailure {
  type: typeof CREATE_GRADING_COMPANY_FAILURE;
}

interface UpdateGradingCompanyRequest {
  type: typeof UPDATE_GRADING_COMPANY_REQUEST;
}
interface UpdateGradingCompanySuccess {
  type: typeof UPDATE_GRADING_COMPANY_SUCCESS;
  company: GradingCompany;
}
interface UpdateGradingCompanyFailure {
  type: typeof UPDATE_GRADING_COMPANY_FAILURE;
}

export type GradingCompanyActionTypes =
  | GetAllGradingCompaniesRequest
  | GetAllGradingCompaniesSuccess
  | GetAllGradingCompaniesFailure
  | CreateGradingCompanyRequest
  | CreateGradingCompanySuccess
  | CreateGradingCompanyFailure
  | UpdateGradingCompanyRequest
  | UpdateGradingCompanySuccess
  | UpdateGradingCompanyFailure;
