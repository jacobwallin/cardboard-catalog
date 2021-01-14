import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import { updateCard } from "../../store/library/card/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import detectFormChanges from "../../utils/detectFormChanges";
import {
  EditFormLine,
  EditFormContainer,
  EditFormButtons,
} from "./components/EditForm";

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
  const [nameField, setNameField] = useState(card.card_datum.name);
  const [numberField, setNumberField] = useState(card.card_datum.number);
  const [rookieField, setRookieField] = useState(card.card_datum.rookie);
  const [teamIdField, setTeamIdField] = useState(card.card_datum.teamId);

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
          data={card.card_datum.name}
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
          data={card.card_datum.number}
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
          data={card.card_datum.team.name}
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
          data={card.card_datum.rookie === true ? "YES" : "NO"}
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
            [
              card.card_datum.name,
              card.card_datum.number,
              card.card_datum.rookie,
              card.card_datum.teamId,
            ]
          )}
        />
      </EditFormContainer>
    </div>
  );
}
