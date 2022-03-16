import { CardFormData } from "./AddCardsForm";
import { GradingCompany } from "../../../store/library/grading_companies/types";

// grade must convert properly to number, be in the range [0,10], and divisible by 0.5
export function grade(grade: string) {
  if (!+grade || +grade > 10 || +grade < 0 || +grade % 0.5 !== 0) {
    return true;
  }
  return false;
}

export function serialNumber(serialNumber: string, limit: number | null) {
  if (limit) {
    if (!+serialNumber) {
      return true;
    } else if (+serialNumber < 0 || +serialNumber > limit) {
      return true;
    }
  }
  return false;
}

// verify id exists in db
export function gradingCompany(id: number, gradingCompanies: GradingCompany[]) {
  if (gradingCompanies.findIndex((company) => company.id === id) === -1) {
    return true;
  }

  return false;
}

export function allCardData(cardData: CardFormData[]): {
  errorsFound: boolean;
  validatedCardData: CardFormData[];
} {
  let errorsFound = false;
  const validatedCardData = cardData.map((data) => {
    // if a validatino error already exists, value will not change
    let serialNumberError = data.serialNumberError;
    let gradeError = data.gradeError;
    let gradingCompanyError = data.gradingCompanyError;

    if (serialNumberError || gradeError || gradingCompanyError) {
      errorsFound = true;
    }

    // make sure a serial number is entered by the user if the series is serialized
    if (data.serialized) {
      if (data.serialNumber === "") {
        errorsFound = true;
        serialNumberError = true;
      }
    }
    // either both or neither the grade and grading company must be entered
    if (data.grade !== "" || data.gradingCompanyId !== -1) {
      if (data.grade !== "") {
        if (data.gradingCompanyId === -1) {
          gradingCompanyError = true;
          errorsFound = true;
        }
      } else {
        gradeError = true;
        errorsFound = true;
      }
    }
    return { ...data, serialNumberError, gradeError, gradingCompanyError };
  });

  return { errorsFound, validatedCardData };
}
