import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditFormLine from "./components/EditFormLine";
import EditFormContainer from "./components/EditFormContainer";
import EditFormButtons from "./components/EditFormButtons";
import { RootState } from "../../store";
import { createLoadingSelector } from "../../store/loading/reducer";
import { updateSubset } from "../../store/library/subsets/thunks";
import detectFormChanges from "../../utils/detectFormChanges";

const isUpdatingSelector = createLoadingSelector(["UPDATE_SUBSET"]);

export default function SubsetFrom() {
  const dispatch = useDispatch();
  const subset = useSelector(
    (state: RootState) => state.library.subsets.singleSubset
  );
  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [nameField, setNameField] = useState(subset.name);
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
        cardQuantity: subset.cardQuantity,
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
      case "descriptionField":
        setDescriptionField(value);
        break;
    }
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
        title="Subset Description: "
        data={subset.description}
        input={
          <input
            name="descriptionField"
            type="text"
            value={descriptionField}
            disabled={isUpdating}
            placeholder="Enter Subset Description"
            onChange={handleInputChange}
          />
        }
      />
      <EditFormButtons
        isEditing={isEditing}
        isUpdating={isUpdating}
        changesMade={detectFormChanges(
          [subset.name, subset.description],
          [nameField, descriptionField]
        )}
        handleEditStateChange={handleEditStateChange}
        handleFormSubmit={handleFormSubmit}
      />
    </EditFormContainer>
  );
}
