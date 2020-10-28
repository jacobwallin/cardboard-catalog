import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateSet } from "../../store/library/sets/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";

import EditFormLine, { EditFormContainer } from "./components/EditForm";
import StyledButton from "./components/StyledButton";

const isUpdatingSelector = createLoadingSelector(["UPDATE_SET"]);

export default function EditSet() {
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
  const isUpdatingSet = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  useEffect(() => {
    if (!isUpdatingSet) {
      setEditing(false);
    }
  }, [isUpdatingSet]);

  // toggles between showing current set info and the form to edit it
  const [editing, setEditing] = useState(false);
  // controlled form data
  const [nameField, setNameField] = useState("");
  const [yearField, setYearField] = useState(0);
  const [brandIdField, setbBrandIdField] = useState(0);
  const [leagueIdField, setLeagueIdField] = useState(0);
  const [descriptionField, setDescriptionField] = useState("");

  // form change handlers
  function handleEditStateChange() {
    // set initial values for form (cannot do with useState since data will not be fetched yet at that point)
    //TODO: wait to render this component until after data is fetched
    if (!editing) {
      setNameField(singleSet.name);
      setYearField(singleSet.year);
      setDescriptionField(singleSet.description);
      setbBrandIdField(singleSet.brand.id);
      setLeagueIdField(singleSet.league.id);
    }
    setEditing((editing) => !editing);
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

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value;
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
    const value = event.target.value;
    switch (event.target.name) {
      case "league":
        setLeagueIdField(+value);
        break;
      case "brand":
        setbBrandIdField(+value);
    }
  }

  // if (isUpdatingSet) {
  //   return (
  //     <EditFormContainer>
  //       <h1>UPDATING SET INFO</h1>
  //     </EditFormContainer>
  //   );
  // }

  return (
    <EditFormContainer>
      <EditFormLine
        editing={editing}
        title="Set Name: "
        data={singleSet.name}
        input={
          <input
            name="nameField"
            type="text"
            value={nameField}
            disabled={isUpdatingSet}
            placeholder="Enter Set Name"
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={editing}
        title="Set Year: "
        data={singleSet.year}
        input={
          <input
            name="yearField"
            type="text"
            value={yearField}
            disabled={isUpdatingSet}
            placeholder="Enter Set Year"
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={editing}
        title="Set Brand: "
        data={singleSet.brand.name}
        input={
          <select
            name="brand"
            value={brandIdField}
            disabled={isUpdatingSet}
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
        editing={editing}
        title="Set League: "
        data={singleSet.league.name}
        input={
          <select
            name="league"
            value={leagueIdField}
            disabled={isUpdatingSet}
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
        editing={editing}
        title="Set Description: "
        data={singleSet.description}
        input={
          <textarea
            name="descriptionFieldField"
            value={descriptionField}
            disabled={isUpdatingSet}
            placeholder="Enter Set Description"
            onChange={handleInputChange}
          />
        }
      />
      {editing ? (
        <>
          <StyledButton
            onClick={handleEditStateChange}
            buttonType="CANCEL"
            disabled={isUpdatingSet}
          >
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleFormSubmit}
            buttonType="SAVE"
            disabled={isUpdatingSet}
          >
            Save
          </StyledButton>
        </>
      ) : (
        <StyledButton onClick={handleEditStateChange} buttonType="EDIT">
          Edit
        </StyledButton>
      )}
      {isUpdatingSet && <h2>UPDATING SET</h2>}
    </EditFormContainer>
  );
}
