import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import EditFormLine, { EditFormContainer } from "./components/EditForm";

export default function EditSet() {
  // redux state for set data
  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );

  // controlled form data
  const [editing, setEditing] = useState(false);
  const [nameField, setNameField] = useState("");
  const [yearField, setYearField] = useState(0);
  const [brandIdField, setbBrandIdField] = useState(1);
  const [leagueIdField, setLeagueIdField] = useState(0);
  const [descriptionFieldField, setDescriptionField] = useState("");

  // form change handlers
  function handleEditStateChange() {
    // set initial values for form (cannot do with useState since data will not be fetched yet at that point)
    //TODO: wait to render this component until after data is fetched
    if (!editing) {
      setNameField(singleSet.name);
      setYearField(singleSet.year);
      setDescriptionField(singleSet.description);
    }
    setEditing((editing) => !editing);
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
            onChange={handleSelectChange}
          >
            <option value={0}>Test 0</option>
            <option value={1}>Test 1</option>
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
            onChange={handleSelectChange}
          >
            <option value={0}>Test 0</option>
            <option value={1}>Test 1</option>
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
            value={descriptionFieldField}
            placeholder="Enter Set Description"
            onChange={handleInputChange}
          />
        }
      />
      <button onClick={handleEditStateChange}>Edit</button>
    </EditFormContainer>
  );
}
