import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/index";
import { updateCard } from "../../../../store/library/card/thunks";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import detectFormChanges from "../../detectFormChanges";
import EditFormLine from "../../components/EditFormLine";
import EditFormContainer from "../../components/EditFormContainer";
import EditFormButtons from "../../components/EditFormButtons";
import * as Styled from "./styled";
import StyledButton from "../../components/StyledButton";
import { PlayersState } from "../../../../store/library/players/types";

const isUpdatingSelector = createLoadingSelector(["UPDATE_CARD"]);

interface Props {
  cardDataId: number;
}

export default function EditCard(props: Props) {
  const dispatch = useDispatch();

  const card = useSelector((state: RootState) => state.library.card);

  const teams = useSelector((state: RootState) => state.library.teams);
  const allPlayers = useSelector((state: RootState) => state.library.players);

  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, []);

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
  const [players, setPlayers] = useState<PlayersState>(
    card.players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        birthday: player.birthday,
        hallOfFame: player.hallOfFame,
        createdAt: "",
        updatedAt: "",
      };
    })
  );
  const [playerFilter, setPlayerFilter] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState(0);

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
      case "playerFilter":
        setPlayerFilter(event.target.value);
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
      case "selectedPlayerId":
        setSelectedPlayerId(+value);
        break;
    }
  }

  function deletePlayer(id: number) {
    setPlayers(players.filter((player) => player.id !== id));
  }

  function addPlayer() {
    if (selectedPlayerId !== 0) {
      if (
        players.findIndex((player) => player.id === selectedPlayerId) === -1
      ) {
        const playerToAdd = allPlayers.find(
          (player) => player.id === selectedPlayerId
        )!;
        setPlayers([...players, playerToAdd]);
      }
    }
  }

  function handleFormSubmit() {
    dispatch(
      updateCard(props.cardDataId, {
        name: nameField,
        number: numberField,
        rookie: rookieField,
        teamId: teamIdField,
        playerIds: players.map((player) => player.id),
      })
    );
  }

  return (
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
      <EditFormLine
        editing={isEditing}
        title="Players: "
        data={card.players.map((player) => {
          return <div key={player.id}>{player.name}</div>;
        })}
        input={
          <Styled.PlayersContainer>
            <Styled.PlayerFilter
              type="text"
              name="playerFilter"
              placeholder="Filter Players"
              autoComplete="off"
              value={playerFilter}
              onChange={handleInputChange}
            />
            <Styled.AddPlayerContainer>
              <Styled.PlayerSelect
                name="selectedPlayerId"
                value={selectedPlayerId}
                onChange={handleSelectChange}
              >
                <option value={0}>Select Player</option>
                {allPlayers
                  .filter((player) => {
                    return player.name
                      .toLowerCase()
                      .includes(playerFilter.toLowerCase());
                  })
                  .sort((playerA, playerB) => {
                    if (playerA.name < playerB.name) {
                      return -1;
                    }
                    if (playerA.name > playerB.name) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((player) => {
                    return (
                      <option key={player.id} value={player.id}>
                        {player.name}
                      </option>
                    );
                  })}
              </Styled.PlayerSelect>
              <StyledButton
                color="BLUE"
                height="25px"
                width="50px"
                onClick={addPlayer}
              >
                Add
              </StyledButton>
            </Styled.AddPlayerContainer>
            {players.map((player) => {
              return (
                <Styled.CurrentPlayersContainer key={player.id}>
                  <StyledButton
                    color="RED"
                    height="25px"
                    width="25px"
                    onClick={() => deletePlayer(player.id)}
                  >
                    x
                  </StyledButton>
                  <Styled.PlayerName>{player.name}</Styled.PlayerName>
                </Styled.CurrentPlayersContainer>
              );
            })}
          </Styled.PlayersContainer>
        }
      />
      <EditFormButtons
        isEditing={isEditing}
        isUpdating={isUpdating}
        handleEditStateChange={handleEditStateChange}
        handleFormSubmit={handleFormSubmit}
        changesMade={detectFormChanges(
          [
            nameField,
            numberField,
            rookieField,
            teamIdField,
            players.map((player) => player.id),
          ],
          [
            card.name,
            card.number,
            card.rookie,
            card.teamId,
            card.players.map((player) => player.id),
          ]
        )}
      />
    </EditFormContainer>
  );
}
