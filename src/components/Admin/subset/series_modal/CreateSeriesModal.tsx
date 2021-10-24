import React from "react";
import { useDispatch } from "react-redux";
import { createSeries } from "../../../../store/library/subsets/thunks";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import SeriesForm from "../../series/series_form/SeriesForm";

interface Props {
  handleCancel(): void;
  subsetId: number;
}
export default function CreateCardModal(props: Props) {
  const dispatch = useDispatch();

  function handleFormSubmit(seriesData: {
    name: string;
    serialized: number | null;
    auto: boolean;
    relic: boolean;
    manufacturedRelic: boolean;
    refractor: boolean;
    shortPrint: boolean;
  }) {
    dispatch(
      createSeries({
        subsetId: props.subsetId,
        ...seriesData,
      })
    );
  }
  return (
    <ModalBackground>
      <ModalWindow>
        <h3 style={{ textAlign: "center" }}>Create Parallel Set</h3>
        <SeriesForm
          createNew={true}
          handleCancel={props.handleCancel}
          handleSubmit={handleFormSubmit}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
