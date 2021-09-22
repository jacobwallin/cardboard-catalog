import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    if (!isUpdating) {
      setIsEditing(false);
    }
  }, [isUpdating]);

  // toggles between showing current series info and the form to edit it
  const [isEditing, setIsEditing] = useState(false);
  // controlled form data
  const [name, setName] = useState(series.name);
  const [serialized, setSerialized] = useState<string>(
    series.serialized === null ? "" : series.serialized.toString()
  );
  const [auto, setAuto] = useState(series.auto);
  const [relic, setRelic] = useState(series.relic);
  const [manufacturedRelic, setManufacturedRelic] = useState(
    series.manufacturedRelic
  );
  const [parallel, setParallel] = useState(series.parallel);
  const [shortPrint, setShortPrint] = useState(series.shortPrint);

  // form change handlers
  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }

  function handleFormSubmit() {
    dispatch(
      updateSeries(series.id, {
        name,
        serialized: serialized === "" ? null : +serialized,
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
      case "serialized":
        setSerialized(value);
        break;
      case "parallel":
        setParallel(!parallel);
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
        data={series.serialized || "Not Serialized"}
        input={
          <input
            name="serialized"
            type="number"
            value={serialized}
            disabled={isUpdating}
            placeholder="Enter #"
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Parallel: "
        data={series.parallel ? "Yes" : "No"}
        input={
          <input
            name="parallel"
            type="checkbox"
            checked={parallel}
            disabled={isUpdating}
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Short Print: "
        data={series.shortPrint ? "Yes" : "No"}
        input={
          <input
            name="shortPrint"
            type="checkbox"
            checked={shortPrint}
            disabled={isUpdating}
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Auto: "
        data={series.auto ? "Yes" : "No"}
        input={
          <input
            name="auto"
            type="checkbox"
            checked={auto}
            disabled={isUpdating}
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Relic: "
        data={series.relic ? "Yes" : "No"}
        input={
          <input
            name="relic"
            type="checkbox"
            checked={relic}
            disabled={isUpdating}
            onChange={handleInputChange}
          />
        }
      />
      <EditFormLine
        editing={isEditing}
        title="Manufactured Relic: "
        data={series.manufacturedRelic ? "Yes" : "No"}
        input={
          <input
            name="manufacturedRelic"
            type="checkbox"
            checked={manufacturedRelic}
            disabled={isUpdating}
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
            series.serialized ? series.serialized.toString() : "",
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
