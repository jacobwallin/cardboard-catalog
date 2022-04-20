import React from "react";
import EditLink from "../components/EditLink";
import { ReactComponent as Checkmark } from "../subset/checkmark.svg";
import { SetSummary } from "../../../store/library/sets/types";
import * as Styled from "./styled";
import SubtleLink from "../../shared/SubtleLink";

const dataTableColumns = [
  {
    name: "Name",
    selector: (row: SetSummary) => row.name,
    cell: (row: SetSummary) => (
      <SubtleLink to={`/admin/set/${row.id}`}>{row.name}</SubtleLink>
    ),
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: SetSummary) => row.year,
    sortable: true,
  },
  {
    name: "Brand",
    selector: (row: SetSummary) => row.brand.name,
    sortable: true,
  },
  {
    name: "League",
    selector: (row: SetSummary) => row.league.name,
    sortable: true,
  },
  {
    name: "Date Added",
    selector: (row: SetSummary) => row.createdAt.slice(0, 10),
    sortable: true,
  },
  {
    name: "Completed",
    sortable: true,
    selector: (row: SetSummary) => row.complete,
    cell: (row: any) =>
      row.complete ? (
        <Styled.SvgWrapper>
          <Checkmark />
        </Styled.SvgWrapper>
      ) : (
        "-"
      ),
  },
  {
    name: "",
    sortable: false,
    cell: (row: SetSummary) => <EditLink to={`/admin/set/${row.id}`} />,
    grow: 0,
  },
];

export default dataTableColumns;
