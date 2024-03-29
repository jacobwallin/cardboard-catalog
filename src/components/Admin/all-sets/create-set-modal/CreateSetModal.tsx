import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import ErrorMessage from "../../components/form/ErrorMessage";
import { createStatusSelector } from "../../../../store/loading/reducer";
import { fetchLeagues } from "../../../../store/library/leagues/thunks";
import { fetchAllBrands } from "../../../../store/library/brands/thunks";
import { createSet } from "../../../../store/library/sets/thunks";
import SetForm from "../../set/edit_set/SetForm";
import ModalHeader from "../../components/modal/ModalHeader";

const createSetSelector = createStatusSelector("CREATE_SET");

interface Props {
  handleCancel(): void;
}

export default function CreateSetModal(props: Props) {
  const dispatch = useDispatch();

  const [setCreated, setSetCreated] = useState(false);

  const createSetStatus = useSelector((state: RootState) =>
    createSetSelector(state)
  );
  useEffect(() => {
    dispatch(fetchLeagues());
    dispatch(fetchAllBrands());
  }, []);

  function handleSubmit(
    name: string,
    release_date: string | null,
    year: number,
    description: string,
    leagueId: number,
    brandId: number,
    complete: boolean
  ) {
    // this will dismiss modal once reequest is successful from server
    setSetCreated(true);

    // dispatch thunk to create set
    dispatch(
      createSet({
        name,
        release_date,
        description,
        leagueId,
        brandId,
        year,
      })
    );
  }

  return (
    <ModalBackground>
      <ModalWindow>
        <ModalHeader title="Create Set" handleClose={props.handleCancel} />
        <SetForm
          createNew={true}
          handleSubmit={handleSubmit}
          handleCancel={props.handleCancel}
        />
        {setCreated && createSetStatus === "FAILURE" && (
          <ErrorMessage>Error Creating Set</ErrorMessage>
        )}
      </ModalWindow>
    </ModalBackground>
  );
}
