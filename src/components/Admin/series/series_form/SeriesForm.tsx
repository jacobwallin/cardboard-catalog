import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/index";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import detectFormChanges from "../../detectFormChanges";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormButtons from "../../components/form/FormButtons";
import * as StyledInputs from "../../components/form/Inputs";

const isUpdatingSelector = createLoadingSelector([
  "UPDATE_SERIES",
  "CREATE_SERIES",
]);

interface Props {
  createNew: boolean;
  handleCancel(): void;
  handleSubmit(seriesData: {
    name: string;
    serialized: number | null;
    refractor: boolean;
  }): void;
}
export default function SeriesForm(props: Props) {
  const series = useSelector((state: RootState) => state.library.series.series);
  const isLoading = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  // controlled form data
  const [name, setName] = useState(props.createNew ? "" : series.name);
  const [serialized, setSerialized] = useState<string>(
    props.createNew
      ? ""
      : series.serialized === null
      ? ""
      : series.serialized.toString()
  );

  const [refractor, setRefractor] = useState(
    props.createNew ? false : series.refractor
  );

  function handleFormSubmit() {
    props.handleSubmit({
      name,
      serialized: serialized === "" ? null : +serialized,
      refractor,
    });
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    switch (event.target.name) {
      case "name":
        setName(value);
        break;
      case "serialized":
        setSerialized(value);
        break;
      case "refractor":
        setRefractor(!refractor);
        break;
    }
  }

  return (
    <>
      <FieldContainer>
        <FieldTitle>Name</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            name="name"
            type="text"
            value={name}
            placeholder="Enter Parallel Name"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Serialized to</FieldTitle>
        <FieldData>
          <StyledInputs.NumberInput
            name="serialized"
            type="number"
            value={serialized}
            placeholder="Enter #"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Refractor</FieldTitle>
        <FieldData>
          <input
            name="refractor"
            type="checkbox"
            checked={refractor}
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FormButtons
        handleSubmit={handleFormSubmit}
        handleCancel={props.handleCancel}
        disabled={
          isLoading ||
          (props.createNew
            ? name === ""
            : !detectFormChanges(
                [
                  series.name,
                  series.serialized ? series.serialized.toString() : "",
                  series.refractor,
                ],
                [name, serialized, refractor]
              ))
        }
      />
    </>
  );
}
