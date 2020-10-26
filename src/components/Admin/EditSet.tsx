import React, { useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSet } from "../../store/library/sets/thunks";
import { RootState } from "../../store";
import styled from "styled-components";

import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Card Qty",
    selector: "cardQuantity",
    sortable: true,
  },
  {
    name: "Edit",
    sortable: false,
    cell: (row: any) => <Link to={`/admin/edit-subset/${row.id}`}>Edit</Link>,
  },
];

const SetInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 10px;
  padding: 10px;
`;

const SetInfoLine = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const SetInfoTitle = styled.div`
  font-weight: bold;
  width: 25%;
`;

const SetInfoData = styled.div`
  font-weight: normal;
`;

interface Params {
  setId: string;
}

export default function EditSet(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();
  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );

  useEffect(() => {
    dispatch(fetchSet(+props.match.params.setId));
  }, []);
  return (
    <div>
      <SetInfoContainer>
        <SetInfoLine>
          <SetInfoTitle>Set Name: </SetInfoTitle>
          <SetInfoData>{singleSet.name}</SetInfoData>
        </SetInfoLine>
        <SetInfoLine>
          <SetInfoTitle>Set Year: </SetInfoTitle>
          <SetInfoData>{singleSet.year}</SetInfoData>
        </SetInfoLine>
        <SetInfoLine>
          <SetInfoTitle>Set Brand: </SetInfoTitle>
          <SetInfoData>{singleSet.brand.name}</SetInfoData>
        </SetInfoLine>
        <SetInfoLine>
          <SetInfoTitle>Set League: </SetInfoTitle>
          <SetInfoData>{singleSet.league.name}</SetInfoData>
        </SetInfoLine>
        <SetInfoLine>
          <SetInfoTitle>Set Description: </SetInfoTitle>
          <SetInfoData>{singleSet.description}</SetInfoData>
        </SetInfoLine>
      </SetInfoContainer>
      <DataTable
        title="Subsets"
        columns={columns}
        data={singleSet.subsets}
        highlightOnHover
      />
    </div>
  );
}
