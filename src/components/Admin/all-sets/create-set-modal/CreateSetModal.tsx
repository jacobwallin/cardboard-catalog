import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ModalBackground from "../../components/modal/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import { fetchLeagues } from "../../../../store/library/leagues/thunks";
import { fetchAllBrands } from "../../../../store/library/brands/thunks";
import { createSet } from "../../../../store/library/sets/thunks";
import SetForm from "../../set/edit_set/SetForm";

const createSetSelector = createLoadingSelector(["CREATE_SET"]);

interface Props {
  handleCancel(): void;
}

export default function CreateSetModal(props: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeagues());
    dispatch(fetchAllBrands());
  }, []);

  const createSetLoading = useSelector((state: RootState) =>
    createSetSelector(state)
  );

  function handleSubmit(
    name: string,
    year: number,
    description: string,
    leagueId: number,
    brandId: number,
    baseSubsetId: number | null
  ) {
    // dispatch thunk to create set
    dispatch(createSet({ name, year: year, description, leagueId, brandId }));
  }

  return (
    <ModalBackground>
      <ModalWindow>
        <SetForm
          createNew={true}
          handleSubmit={handleSubmit}
          handleCancel={props.handleCancel}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
