import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/index";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import { updateSeries } from "../../../../store/library/series/thunks";
import detectFormChanges from "../../detectFormChanges";

import EditFormLine from "../../components/EditFormLine";
import EditFormContainer from "../../components/EditFormContainer";
import EditFormButtons from "../../components/EditFormButtons";

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
  const [name, setName] = useState(series.name);
  const [serialized, setSerialized] = useState(series.serialized);
  const [auto, setAuto] = useState(false);
  const [relic, setRelic] = useState(false);
  const [manufacturedRelic, setManufacturedRelic] = useState(false);
  const [parallel, setParallel] = useState(false);
  const [shortPrint, setShortPrint] = useState(false);

  // form change handlers
  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }

  function handleFormSubmit() {
    dispatch(
      updateSeries(series.id, {
        name,
        serialized,
        auto,
        relic,
        manufacturedRelic,
        parallel,
        shortPrint,
      })
    );
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    switch (event.target.name) {
      case "nameField":
        setName(value);
        break;
      case "serializedField":
        setSerialized(+value);
        break;
    }
  }

  function handleAttributeInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.checked) {
    }
  }

  console.log("SERiAL:", serialized);

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
            value={name}
            disabled={isUpdating}
            placeholder="Enter Set Name"
            onChange={handleInputChange}
          />
        }
      />

      <EditFormLine
        editing={isEditing}
        title="Serialized To: "
        data={series.serialized}
        input={
          <input
            name="serializedToField"
            type="text"
            value={serialized || ""}
            disabled={isUpdating}
            placeholder="Enter #"
            onChange={handleInputChange}
          />
        }
      />

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
            name,
            serialized,
            auto,
            relic,
            manufacturedRelic,
            parallel,
            shortPrint,
          ]
        )}
        handleEditStateChange={handleEditStateChange}
        handleFormSubmit={handleFormSubmit}
      />
    </EditFormContainer>
  );
}
