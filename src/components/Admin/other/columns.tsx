import React from "react";
import { GradingCompany } from "../../../store/library/grading_companies/types";
import { Brand } from "../../../store/library/brands/types";
import { StyledLink } from "../components/EditLink";

export const companyColumns = (
  editToggle: (company: GradingCompany) => void
) => [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: GradingCompany) => (
      <>
        <StyledLink as="div" onClick={() => editToggle(row)}>
          Edit
        </StyledLink>
      </>
    ),
    grow: 0,
  },
];

export const brandColumns = (editToggle: (brand: Brand) => void) => [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Brand) => (
      <>
        <StyledLink as="div" onClick={() => editToggle(row)}>
          Edit
        </StyledLink>
      </>
    ),
    grow: 0,
  },
];
