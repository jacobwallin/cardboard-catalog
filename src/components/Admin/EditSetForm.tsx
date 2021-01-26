import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateSet } from "../../store/library/sets/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import detectFormChanges from "../../utils/detectFormChanges";

import EditFormLine from "./components/EditFormLine";
import EditFormContainer from "./components/EditFormContainer";
import EditFormButtons from "./components/EditFormButtons";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const isUpdatingSelector = createLoadingSelector(["UPDATE_SET"]);

export default function SetForm() {
  const dispatch = useDispatch();

  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );
  const brands = useSelector(
    (state: RootState) => state.library.brands.allBrands
  );
  const leagues = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );
  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  useEffect(() => {
    if (!isUpdating) {
      setIsEditing(false);
    }
  }, [isUpdating]);

  // toggles between showing current set info and the form to edit it
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  // controlled form data
  const [nameField, setNameField] = useState(singleSet.name);
  const [yearField, setYearField] = useState(singleSet.year);
  const [brandIdField, setbBrandIdField] = useState(singleSet.brand.id);
  const [leagueIdField, setLeagueIdField] = useState(singleSet.league.id);
  const [descriptionField, setDescriptionField] = useState(
    singleSet.description
  );

  // form change handlers
  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }

  function handleFormSubmit() {
    dispatch(
      updateSet(singleSet.id, {
        name: nameField,
        year: yearField,
        description: descriptionField,
        leagueId: leagueIdField,
        brandId: brandIdField,
      })
    );
  }

  function handleDeleteSet() {
    // delete set
  }

  function handleToggleModal() {
    setShowConfirmDeleteModal(!showConfirmDeleteModal);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    switch (event.target.name) {
      case "nameField":
        setNameField(value);
        break;
      case "yearField":
        setYearField(+value);
        break;
      case "descriptionFieldField":
        setDescriptionField(value);
    }
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    switch (event.target.name) {
      case "league":
        setLeagueIdField(+value);
        break;
      case "brand":
        setbBrandIdField(+value);
    }
  }

  return (
    <EditFormContainer>
      {showConfirmDeleteModal && (
        <ConfirmDeleteModal
          message={"Are you sure you want to delete?"}
          handleDelete={handleDeleteSet}
          handleDismiss={handleToggleModal}
        />
      )}
      <EditFormLine
        editing={isEditing}
        title="Set Name: "
        data={singleSet.name}
        input={
          <input
            name="nameField"
            type="text"
            value={nameField}
            disabled={isUpdating}
            placeholder="Enter Set Name"
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Set Year: "
        data={singleSet.year}
        input={
          <input
            name="yearField"
            type="text"
            value={yearField}
            disabled={isUpdating}
            placeholder="Enter Set Year"
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Set Brand: "
        data={singleSet.brand.name}
        input={
          <select
            name="brand"
            value={brandIdField}
            disabled={isUpdating}
            onChange={handleSelectChange}
          >
            {brands.map((brand) => {
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              );
            })}
          </select>
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Set League: "
        data={singleSet.league.name}
        input={
          <select
            name="league"
            value={leagueIdField}
            disabled={isUpdating}
            onChange={handleSelectChange}
          >
            {leagues.map((league) => {
              return (
                <option key={league.id} value={league.id}>
                  {league.name}
                </option>
              );
            })}
          </select>
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Set Description: "
        data={singleSet.description}
        input={
          <textarea
            name="descriptionFieldField"
            value={descriptionField}
            disabled={isUpdating}
            placeholder="Enter Set Description"
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
          [
            singleSet.name,
            singleSet.description,
            singleSet.league.id,
            singleSet.brand.id,
            singleSet.year,
          ],
          [nameField, descriptionField, leagueIdField, brandIdField, yearField]
        )}
        handleEditStateChange={handleEditStateChange}
        handleFormSubmit={handleFormSubmit}
        handleDelete={handleToggleModal}
      />
    </EditFormContainer>
  );
}
