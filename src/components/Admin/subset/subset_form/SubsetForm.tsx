import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import detectFormChanges from "../../detectFormChanges";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormButtons from "../../components/form/FormButtons";
import * as StyledInputs from "../../components/form/Inputs";

const isUpdatingSelector = createLoadingSelector(["UPDATE_SUBSET"]);

interface Props {
  createNew: boolean;
  handleSubmit(subsetData: {
    name: string;
    description: string;
    prefix: string;
    code: string | null;
    auto: boolean;
    relic: boolean;
    manufacturedRelic: boolean;
    shortPrint: boolean;
  }): void;
  handleCancel(): void;
  handleDelete?(): void;
}

export default function SubsetForm(props: Props) {
  const subset = useSelector((state: RootState) => state.library.subsets);
  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  const [name, setName] = useState(props.createNew ? "" : subset.name);
  const [prefix, setPrefix] = useState(props.createNew ? "" : subset.prefix);
  const [code, setCode] = useState(props.createNew ? "" : subset.code);
  const [auto, setAuto] = useState(props.createNew ? false : subset.auto);
  const [relic, setRelic] = useState(props.createNew ? false : subset.relic);
  const [manufacturedRelic, setManufacturedRelic] = useState(
    props.createNew ? false : subset.manufacturedRelic
  );
  const [shortPrint, setShortPrint] = useState(
    props.createNew ? false : subset.shortPrint
  );

  const [description, setDescription] = useState(
    props.createNew ? "" : subset.description
  );

  function handleFormSubmit() {
    props.handleSubmit({
      name,
      description,
      prefix,
      auto,
      relic,
      manufacturedRelic,
      shortPrint,
      code: code === "" ? null : code,
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
      case "description":
        setDescription(value);
        break;
      case "prefix":
        setPrefix(value);
        break;
      case "code":
        setCode(value);
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
    <>
      <FieldContainer>
        <FieldTitle>Name</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            name="name"
            type="text"
            value={name}
            placeholder="Enter Subset Name"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Description</FieldTitle>
        <FieldData>
          <StyledInputs.TextArea
            name="description"
            value={description}
            disabled={isUpdating}
            placeholder="Enter Description"
            autoComplete="off"
            onChange={handleInputChange}
            style={{ height: "200px", width: "100%" }}
            rows={2}
            cols={20}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Card # prefix</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            name="prefix"
            type="text"
            value={prefix}
            placeholder="Enter Prefix"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Code</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            name="code"
            type="text"
            value={code || ""}
            placeholder="Enter Code"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Auto</FieldTitle>
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
        <FieldTitle>Relic</FieldTitle>
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
        <FieldTitle>Short Print</FieldTitle>
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
        <FieldTitle>Manufactured Relic</FieldTitle>
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
        disabled={
          isUpdating ||
          (props.createNew
            ? name === ""
            : !detectFormChanges(
                [
                  subset.name,
                  subset.description,
                  subset.prefix,
                  subset.auto,
                  subset.relic,
                  subset.manufacturedRelic,
                  subset.shortPrint,
                  subset.code,
                ],
                [
                  name,
                  description,
                  prefix,
                  auto,
                  relic,
                  manufacturedRelic,
                  shortPrint,
                  code,
                ]
              ))
        }
        handleSubmit={handleFormSubmit}
        handleCancel={props.handleCancel}
        handleDelete={props.handleDelete}
      />
    </>
  );
}
