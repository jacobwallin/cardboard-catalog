import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import { updateCard } from "../../store/library/card/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import detectFormChanges from "./detectFormChanges";
import EditFormLine from "./components/EditFormLine";
import EditFormContainer from "./components/EditFormContainer";
import EditFormButtons from "./components/EditFormButtons";

const isUpdatingSelector = createLoadingSelector(["UPDATE_CARD"]);

interface Props {
  cardId: number;
}

export default function EditCardForm(props: Props) {
  const dispatch = useDispatch();

  const card = useSelector((state: RootState) => state.library.card);

  const teams = useSelector((state: RootState) => state.library.teams);

  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  useEffect(() => {
    if (!isUpdating) {
      setIsEditing(false);
    }
  }, [isUpdating]);

  const [isEditing, setIsEditing] = useState(false);
  const [nameField, setNameField] = useState(card.name);
  const [numberField, setNumberField] = useState(card.number);
  const [rookieField, setRookieField] = useState(card.rookie);
  const [teamIdField, setTeamIdField] = useState(card.teamId);

  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    switch (event.target.name) {
      case "nameField":
        setNameField(event.target.value);
        break;
      case "numberField":
        setNumberField(event.target.value);
        break;
    }
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    switch (event.target.name) {
      case "team":
        setTeamIdField(+value);
        break;
      case "rookie":
        const rookieValue = value === "YES" ? true : false;
        setRookieField(rookieValue);
        break;
    }
  }

  function handleFormSubmit() {
    dispatch(
      updateCard(props.cardId, {
        name: nameField,
        number: numberField,
        rookie: rookieField,
        teamId: teamIdField,
      })
    );
  }

  return (
    <div>
      <EditFormContainer>
        <EditFormLine
          title="Card Name: "
          data={card.name}
          editing={isEditing}
          input={
            <input
              name="nameField"
              type="text"
              value={nameField}
              disabled={isUpdating}
              placeholder="Enter Card Name"
              onChange={handleInputChange}
            />
          }
        />
        <EditFormLine
          title="Card Number: "
          data={card.number}
          editing={isEditing}
          input={
            <input
              name="numberField"
              type="text"
              value={numberField}
              disabled={isUpdating}
              placeholder="Enter Card Number"
              onChange={handleInputChange}
            />
          }
        />
        <EditFormLine
          editing={isEditing}
          title="Team: "
          data={card.team.name}
          input={
            <select
              name="team"
              value={teamIdField}
              disabled={isUpdating}
              onChange={handleSelectChange}
            >
              {teams.map((team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })}
            </select>
          }
        />
        <EditFormLine
          editing={isEditing}
          title="Rookie Card: "
          data={card.rookie === true ? "YES" : "NO"}
          input={
            <select
              name="rookie"
              value={rookieField === true ? "YES" : "NO"}
              disabled={isUpdating}
              onChange={handleSelectChange}
            >
              <option value={"YES"}>YES</option>
              <option value={"NO"}>NO</option>
            </select>
          }
        />
        <EditFormButtons
          isEditing={isEditing}
          isUpdating={isUpdating}
          handleEditStateChange={handleEditStateChange}
          handleFormSubmit={handleFormSubmit}
          changesMade={detectFormChanges(
            [nameField, numberField, rookieField, teamIdField],
            [card.name, card.number, card.rookie, card.teamId]
          )}
        />
      </EditFormContainer>
    </div>
  );
}
