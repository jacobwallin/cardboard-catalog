import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/index";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import detectFormChanges from "../../detectFormChanges";

import FormContainer from "../../components/form/FormContainer";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormButtons from "../../components/form/FormButtons";

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
    auto: boolean;
    relic: boolean;
    manufacturedRelic: boolean;
    parallel: boolean;
    shortPrint: boolean;
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
  const [auto, setAuto] = useState(props.createNew ? false : series.auto);
  const [relic, setRelic] = useState(props.createNew ? false : series.relic);
  const [manufacturedRelic, setManufacturedRelic] = useState(
    props.createNew ? false : series.manufacturedRelic
  );
  const [parallel, setParallel] = useState(
    props.createNew ? false : series.parallel
  );
  const [shortPrint, setShortPrint] = useState(
    props.createNew ? false : series.shortPrint
  );

  function handleFormSubmit() {
    props.handleSubmit({
      name,
      serialized: serialized === "" ? null : +serialized,
      auto,
      relic,
      manufacturedRelic,
      parallel,
      shortPrint,
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
      case "parallel":
        setParallel(!parallel);
        break;
      case "shortPrint":
        setShortPrint(!shortPrint);
        break;
      case "auto":
        setAuto(!auto);
        break;
      case "relic":
        setRelic(!relic);
        break;
      case "manufacturedRelic":
        setManufacturedRelic(!manufacturedRelic);
        break;
    }
  }

  return (
    <FormContainer>
      <FieldContainer>
        <FieldTitle>Series Name:</FieldTitle>
        <FieldData>
          <input
            name="name"
            type="text"
            value={name}
            placeholder="Enter Series Name"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Serialized to:</FieldTitle>
        <FieldData>
          <input
            name="serialized"
            type="number"
            value={serialized}
            placeholder="Enter #"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Parallel:</FieldTitle>
        <FieldData>
          <input
            name="parallel"
            type="checkbox"
            checked={parallel}
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Short Print:</FieldTitle>
        <FieldData>
          <input
            name="shortPrint"
            type="checkbox"
            checked={shortPrint}
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Auto:</FieldTitle>
        <FieldData>
          <input
            name="auto"
            type="checkbox"
            checked={auto}
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Relic:</FieldTitle>
        <FieldData>
          <input
            name="relic"
            type="checkbox"
            checked={relic}
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Manufactured Relic:</FieldTitle>
        <FieldData>
          <input
            name="manufacturedRelic"
            type="checkbox"
            checked={manufacturedRelic}
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
                  series.auto,
                  series.relic,
                  series.manufacturedRelic,
                  series.parallel,
                  series.shortPrint,
                ],
                [
                  name,
                  serialized,
                  auto,
                  relic,
                  manufacturedRelic,
                  parallel,
                  shortPrint,
                ]
              ))
        }
      />
    </FormContainer>
  );
}
