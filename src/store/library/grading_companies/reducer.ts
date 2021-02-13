import {
  GradingCompanyActionTypes,
  GET_ALL_GRADING_COMPANIES_SUCCESS,
  GradingCompany,
} from "./types";

const gradingCompaniesReducer = (
  state: GradingCompany[] = [],
  action: GradingCompanyActionTypes
) => {
  switch (action.type) {
    case GET_ALL_GRADING_COMPANIES_SUCCESS:
      return action.gradingCompanies;
    default:
      return state;
  }
};

export default gradingCompaniesReducer;
