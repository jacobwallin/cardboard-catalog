import React from "react";
import styled from "styled-components";
import { ReactComponent as Checkmark } from "./checkmark.svg";
import { SubsetInstance } from "../../../store/library/subsets/types";
import EditLink from "../components/EditLink";

export const SvgWrapper = styled.div`
  width: 20px;
  height: 20px;
`;

export const dataTableColumns = [
  {
    name: "Name",
    selector: (row: any) =>
      row.prefix !== "" ? `${row.name} (${row.prefix})` : `${row.name}`,
    sortable: true,
    grow: 1,
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
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <EditLink to={`/admin/subset/${row.id}`} />,
    grow: 0,
  },
];
