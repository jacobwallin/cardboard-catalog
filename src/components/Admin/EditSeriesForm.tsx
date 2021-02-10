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
  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  // toggles between showing current series info and the form to edit it
  const [isEditing, setIsEditing] = useState(false);
  // controlled form data
  const [nameField, setNameField] = useState(series.name);
  const [serializedField, setSerializedField] = useState(series.serialized);
  const [isAuto, setIsAuto] = useState(false);
  const [isRelic, setIsRelic] = useState(false);
  const [isManufacturedRelic, setIsManufacturedRelic] = useState(false);
  const [isParallel, setIsParallel] = useState(false);
  const [isShortPrint, setIsShortPrint] = useState(false);

  // form change handlers
  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }

  function handleFormSubmit() {
    dispatch(
      updateSeries(series.id, {
        name: nameField,
        // color is not part of the form
        color: series.color,
        serialized: serializedField,
        auto: isAuto,
        relic: isRelic,
        manufacturedRelic: isManufacturedRelic,
        parallel: isParallel,
        shortPrint: isShortPrint,
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
      case "serializedField":
        setSerializedField(+value);
        break;
    }
  }

  function handleAttributeInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.checked) {
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
      {/* <EditFormLine
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
      /> */}

      {serializedField && (
        <EditFormLine
          editing={isEditing}
          title="Serialized To: "
          data={series.serialized}
          input={
            <input
              name="serializedToField"
              type="text"
              value={serializedField || ""}
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
          [
            series.name,
            series.serialized,
            series.auto,
            series.relic,
            series.manufacturedRelic,
            series.parallel,
            series.shortPrint,
          ],
          [
            nameField,
            serializedField,
            isAuto,
            isRelic,
            isManufacturedRelic,
            isParallel,
            isShortPrint,
          ]
        )}
        handleEditStateChange={handleEditStateChange}
        handleFormSubmit={handleFormSubmit}
      />
    </EditFormContainer>
  );
}
