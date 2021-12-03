import * as types from "./types";

const gradingCompaniesReducer = (
  state: types.GradingCompany[] = [],
  action: types.GradingCompanyActionTypes
) => {
  switch (action.type) {
    case types.GET_ALL_GRADING_COMPANIES_SUCCESS:
      return action.gradingCompanies;
    case types.CREATE_GRADING_COMPANY_SUCCESS:
      return [...state, action.company];
    case types.UPDATE_GRADING_COMPANY_SUCCESS:
      return state.map((c) => {
        if (c.id === action.company.id) {
          return action.company;
        }
        return c;
      });
    default:
      return state;
  }
};

export default gradingCompaniesReducer;
