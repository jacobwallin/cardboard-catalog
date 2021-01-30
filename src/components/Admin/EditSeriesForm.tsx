import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import { createLoadingSelector } from "../../store/loading/reducer";
import { updateSeries } from "../../store/library/series/thunks";
import detectFormChanges from "../../utils/detectFormChanges";

import EditFormLine from "./components/EditFormLine";
import EditFormContainer from "./components/EditFormContainer";
import EditFormButtons from "./components/EditFormButtons";

const isUpdatingSelector = createLoadingSelector(["UPDATE_SERIES"]);

export default function SeriesForm() {
  const dispatch = useDispatch();

  const series = useSelector((state: RootState) => state.library.series.series);
  const attributes = useSelector(
    (state: RootState) => state.library.attributes.attributes
  );
  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  // toggles between showing current series info and the form to edit it
  const [isEditing, setIsEditing] = useState(false);
  // controlled form data
  const [nameField, setNameField] = useState(series.name);
  const [colorField, setColorField] = useState(series.color);
  const [serializedToField, setSerializedToField] = useState(
    series.serializedTo
  );
  // attributes are stored as an array of primary keys of each attribute
  const [attributesField, setAttributesField] = useState(
    series.attributes.map((attr) => attr.id)
  );

  // form change handlers
  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }

  function handleFormSubmit() {
    dispatch(
      updateSeries(series.id, {
        name: nameField,
        color: colorField,
        serializedTo: serializedToField,
        attributes: attributesField,
      })
    );
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    switch (event.target.name) {
      case "nameField":
        setNameField(value);
        break;
      case "colorField":
        console.log("NEW COLOR", value);
        setColorField(value);
        break;
      case "serializedToField":
        setSerializedToField(+value);
        break;
    }
  }

  function handleAttributeInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.checked) {
      setAttributesField([...attributesField, +event.target.value]);
    } else {
      setAttributesField(
        attributesField.filter(
          (attributeId) => attributeId !== +event.target.value
        )
      );
    }
  }

  return (
    <EditFormContainer>
      <EditFormLine
        editing={isEditing}
        title="Series Name: "
        data={series.name}
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
        title="Series Color: "
        data={
          <div
            style={{
              background: `${series.color}`,
              width: "100px",
              height: "20px",
            }}
          ></div>
        }
        input={
          <input
            name="colorField"
            type="color"
            value={colorField}
            disabled={isUpdating}
            placeholder="Select Series Color"
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Series Attributes: "
        data={
          <div>
            {series.attributes.length > 0
              ? series.attributes.map((attribute) => {
                  return <p key={attribute.id}>{attribute.name}</p>;
                })
              : "This series has no attributes"}
          </div>
        }
        input={
          <form>
            {attributes.map((attribute) => {
              return (
                <div key={attribute.id}>
                  <input
                    type="checkbox"
                    // set checked to true if the series currently has the attribute
                    checked={
                      attributesField.findIndex(
                        (att) => att === attribute.id
                      ) !== -1
                    }
                    id={`${attribute.id}`}
                    name={attribute.name}
                    value={attribute.id}
                    onChange={handleAttributeInputChange}
                  />
                  <label htmlFor={attribute.name}>{attribute.name}</label>
                </div>
              );
            })}
          </form>
        }
      />

      {attributesField.findIndex(
        // TODO: CANNOT BE HARD CODED
        (attribute) => attribute === 3
      ) !== -1 && (
        <EditFormLine
          editing={isEditing}
          title="Serialized To: "
          data={series.serializedTo}
          input={
            <input
              name="serializedToField"
              type="text"
              value={serializedToField || ""}
              disabled={isUpdating}
              placeholder="Enter #"
              onChange={handleInputChange}
            />
          }
        />
      )}

      <EditFormButtons
        isEditing={isEditing}
        isUpdating={isUpdating}
        changesMade={detectFormChanges(
          [series.name, series.color, series.attributes.map((attr) => attr.id)],
          [nameField, colorField, attributesField]
        )}
        handleEditStateChange={handleEditStateChange}
        handleFormSubmit={handleFormSubmit}
      />
    </EditFormContainer>
  );
}
