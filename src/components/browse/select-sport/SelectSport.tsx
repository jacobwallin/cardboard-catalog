import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import PageContainer from "../../shared/PageContainer";
import { fetchLeagues } from "../../../store/library/leagues/thunks";
import * as Styled from "./styled";

export default function SelectSport() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

  const sports = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );

  return <Styled.SportGrid>Select A Sport</Styled.SportGrid>;
}
