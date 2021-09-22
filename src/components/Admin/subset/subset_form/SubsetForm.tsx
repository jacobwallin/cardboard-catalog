import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditFormLine from "../../components/EditFormLine";
import EditFormContainer from "../../components/EditFormContainer";
import EditFormButtons from "../../components/EditFormButtons";
import { RootState } from "../../../../store";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import { updateSubset } from "../../../../store/library/subsets/thunks";
import detectFormChanges from "../../detectFormChanges";

const isUpdatingSelector = createLoadingSelector(["UPDATE_SUBSET"]);

export default function SubsetFrom() {
  const dispatch = useDispatch();
  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [nameField, setNameField] = useState(subset.name);
  const [baseSeriesId, setBaseSeriesId] = useState(subset.baseSeriesId || 0);
  const [descriptionField, setDescriptionField] = useState(subset.description);

  useEffect(() => {
    if (!isUpdating) {
      setIsEditing(false);
    }
  }, [isUpdating]);

  function handleFormSubmit() {
    dispatch(
      updateSubset(subset.id, {
        name: nameField,
        description: descriptionField,
        baseSubsetId: baseSeriesId === 0 ? null : baseSeriesId,
      })
    );
  }

  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    switch (event.target.name) {
      case "nameField":
        setNameField(value);
        break;
      case "description":
        setDescriptionField(value);
        break;
    }
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setBaseSeriesId(+event.target.value);
  }

  return (
    <EditFormContainer>
      <EditFormLine
        editing={isEditing}
        title="Subset Name: "
        data={subset.name}
        input={
          <input
            name="nameField"
            type="text"
            value={nameField}
            disabled={isUpdating}
            placeholder="Enter Subset Name"
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Base Series"
        data={
          subset.baseSeriesId
            ? subset.series.find((series) => series.id === subset.baseSeriesId)
                ?.name
            : "NOT SELECTED"
        }
        input={
          <select
            name="baseSubset"
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
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Subset Description: "
        data={subset.description}
        input={
          <textarea
            name="description"
            value={descriptionField}
            disabled={isUpdating}
            placeholder="Enter Subset Description"
            onChange={handleInputChange}
            style={{ height: "200px", width: "100%" }}
            rows={2}
            cols={20}
          />
        }
      />
      <EditFormButtons
        isEditing={isEditing}
        isUpdating={isUpdating}
        changesMade={detectFormChanges(
          [subset.name, subset.description, subset.baseSeriesId],
          [nameField, descriptionField, baseSeriesId]
        )}
        handleEditStateChange={handleEditStateChange}
        handleFormSubmit={handleFormSubmit}
      />
    </EditFormContainer>
  );
}
