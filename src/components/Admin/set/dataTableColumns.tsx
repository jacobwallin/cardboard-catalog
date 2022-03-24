import React from "react";
import styled from "styled-components";
import { ReactComponent as Checkmark } from "../subset/checkmark.svg";
import { SubsetInstance } from "../../../store/library/subsets/types";
import EditLink from "../components/EditLink";

export const SvgWrapper = styled.div`
  width: 20px;
  height: 20px;
`;

const dataTableColumns = [
  {
    name: "Name",
    selector: (row: SubsetInstance) =>
      row.prefix !== "" ? `${row.name} (${row.prefix})` : `${row.name}`,
    sortable: true,
  },

  {
    name: "Auto",
    selector: (row: SubsetInstance) => row.auto,
    cell: (row: SubsetInstance) =>
      row.auto ? (
        <SvgWrapper>
          <Checkmark />
        </SvgWrapper>
      ) : (
        "-"
      ),
    sortable: true,
    maxWidth: "110px",
    minWidth: "110px",
  },
  {
    name: "Relic",
    selector: (row: SubsetInstance) => row.relic,
    cell: (row: SubsetInstance) =>
      row.relic ? (
        <SvgWrapper>
          <Checkmark />
        </SvgWrapper>
      ) : (
        "-"
      ),
    sortable: true,
    maxWidth: "110px",
    minWidth: "110px",
  },
  {
    name: "Short Print",
    selector: (row: SubsetInstance) => row.shortPrint,
    cell: (row: SubsetInstance) =>
      row.shortPrint ? (
        <SvgWrapper>
          <Checkmark />
        </SvgWrapper>
      ) : (
        "-"
      ),
    sortable: true,
    maxWidth: "110px",
    minWidth: "110px",
  },
  {
    name: "Man. Relic",
    selector: (row: SubsetInstance) => row.manufacturedRelic,
    cell: (row: SubsetInstance) =>
      row.manufacturedRelic ? (
        <SvgWrapper>
          <Checkmark />
        </SvgWrapper>
      ) : (
        "-"
      ),
    sortable: true,
    maxWidth: "110px",
    minWidth: "110px",
  },
  {
    name: "",
    sortable: false,
    cell: (row: SubsetInstance) => <EditLink to={`/admin/subset/${row.id}`} />,
    grow: 0,
  },
];

export default dataTableColumns;
