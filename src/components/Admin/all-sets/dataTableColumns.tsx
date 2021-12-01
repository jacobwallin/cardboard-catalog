import React from "react";
import EditLink from "../components/EditLink";
import { ReactComponent as Checkmark } from "../subset/checkmark.svg";
import { SetSummary } from "../../../store/library/sets/types";
import * as Styled from "./styled";

const dataTableColumns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
  },
  {
    name: "Brand",
    selector: "brand.name",
    sortable: true,
  },
  {
    name: "League",
    selector: "league.name",
    sortable: true,
  },
  {
    name: "Date Created",
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
    cell: (row: SetSummary) => <EditLink to={`/admin/edit/set/${row.id}`} />,
    grow: 0,
  },
];

export default dataTableColumns;
