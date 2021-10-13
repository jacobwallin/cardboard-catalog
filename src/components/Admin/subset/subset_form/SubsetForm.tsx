import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import detectFormChanges from "../../detectFormChanges";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormButtons from "../../components/form/FormButtons";
import FormContainer from "../../components/form/FormContainer";

const isUpdatingSelector = createLoadingSelector(["UPDATE_SUBSET"]);

interface Props {
  createNew: boolean;
  handleSubmit(
    name: string,
    description: string,
    baseSeriesId: number | null
  ): void;
  handleCancel(): void;
}

export default function SubsetForm(props: Props) {
  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  const [name, setName] = useState(props.createNew ? "" : subset.name);
  const [baseSeriesId, setBaseSeriesId] = useState(
    props.createNew ? 0 : subset.baseSeriesId || 0
  );
  const [description, setDescription] = useState(
    props.createNew ? "" : subset.description
  );

  function handleFormSubmit() {
    props.handleSubmit(
      name,
      description,
      baseSeriesId === 0 ? null : baseSeriesId
    );
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
    }
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setBaseSeriesId(+event.target.value);
  }

  return (
    <FormContainer>
      <FieldContainer>
        <FieldTitle>Subset Name:</FieldTitle>
        <FieldData>
          <input
            name="name"
            type="text"
            value={name}
            placeholder="Enter Subset Name"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      {!props.createNew && (
        <FieldContainer>
          <FieldTitle>Base Series:</FieldTitle>
          <FieldData>
            <select
              name="baseSeriesId"
              value={baseSeriesId}
              disabled={isUpdating}
              onChange={handleSelectChange}
            >
              <option value={0}>Select Base Series</option>
              {subset.series.map((series) => {
                return (
                  <option key={series.id} value={series.id}>
                    {series.name}
                  </option>
                );
              })}
            </select>
          </FieldData>
        </FieldContainer>
      )}
      <FieldContainer>
        <FieldTitle>Subset Description:</FieldTitle>
        <FieldData>
          <textarea
            name="description"
            value={description}
            disabled={isUpdating}
            placeholder="Enter Subset Description"
            onChange={handleInputChange}
            style={{ height: "200px", width: "100%" }}
            rows={2}
            cols={20}
          />
        </FieldData>
      </FieldContainer>
      <FormButtons
        disabled={
          isUpdating ||
          (props.createNew
            ? name === ""
            : !detectFormChanges(
                [subset.name, subset.description, subset.baseSeriesId || 0],
                [name, description, baseSeriesId]
              ))
        }
        handleCancel={props.handleCancel}
        handleSubmit={handleFormSubmit}
      />
    </FormContainer>
  );
}
