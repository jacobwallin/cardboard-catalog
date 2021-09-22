import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { PlayersState } from "../../../../store/library/players/types";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../../store/library/teams/thunks";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormContainer from "../../components/form/FormContainer";
import FormButtons from "../../components/form/FormButtons";
import StyledButton from "../../components/StyledButton";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import detectFormChanges from "../../detectFormChanges";
import * as Styled from "./styled";

const loadingSelector = createLoadingSelector([
  "GET_ALL_PLAYERS",
  "GET_ALL_TEAMS",
]);

interface Props {
  createNew: boolean;
  handleCancel(): void;
  handleSubmit(
    name: string,
    number: string,
    rookie: boolean,
    teamId: number,
    playerIds: number[]
  ): void;
}

export default function CardForm(props: Props) {
  const dispatch = useDispatch();

  // redux library state
  const card = useSelector((state: RootState) => state.library.card);
  const teams = useSelector((state: RootState) => state.library.teams);
  const allPlayers = useSelector((state: RootState) => state.library.players);
  const loadingInitialData = useSelector((state: RootState) =>
    loadingSelector(state)
  );

  // set the initial values to card state if the form is being used to edit a card data
  const [name, setName] = useState(props.createNew ? "" : card.name);
  const [number, setNumber] = useState(props.createNew ? "" : card.number);
  const [rookie, setRookie] = useState(props.createNew ? false : card.rookie);
  const [teamId, setTeamId] = useState(props.createNew ? 0 : card.teamId);
  const [players, setPlayers] = useState<PlayersState>(
    props.createNew
      ? []
      : card.players.map((player) => {
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

  useEffect(() => {
    dispatch(fetchAllPlayers());
    dispatch(fetchAllTeams());
  }, []);

  function handleSubmit() {
    props.handleSubmit(
      name,
      number,
      rookie,
      teamId,
      players.map((player) => player.id)
    );
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    switch (event.target.name) {
      case "nameField":
        setName(event.target.value);
        break;
      case "numberField":
        setNumber(event.target.value);
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
        setTeamId(+value);
        break;
      case "rookie":
        const rookieValue = value === "YES" ? true : false;
        setRookie(rookieValue);
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
  return (
    <FormContainer>
      <FieldContainer>
        <FieldTitle>Card Name:</FieldTitle>
        <FieldData>
          <input
            name="nameField"
            type="text"
            value={name}
            placeholder="Enter Card Name"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Card Number:</FieldTitle>
        <FieldData>
          <input
            name="numberField"
            type="text"
            value={number}
            placeholder="Enter Card Number"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Card Team:</FieldTitle>
        <FieldData>
          <select
            name="team"
            value={teamId}
            onChange={handleSelectChange}
            disabled={loadingInitialData}
          >
            <option value={0}>Select Team</option>
            {teams.map((team) => {
              return (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              );
            })}
          </select>
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Rookie Card:</FieldTitle>
        <FieldData>
          <select
            name="rookie"
            value={rookie === true ? "YES" : "NO"}
            onChange={handleSelectChange}
          >
            <option value={"YES"}>YES</option>
            <option value={"NO"}>NO</option>
          </select>
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Player(s) on Card:</FieldTitle>
        <FieldData>
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
                disabled={loadingInitialData}
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
        </FieldData>
      </FieldContainer>
      <FormButtons
        handleCancel={props.handleCancel}
        handleSubmit={handleSubmit}
        disabled={
          props.createNew
            ? name === "" || number === "" || teamId === 0
            : !detectFormChanges(
                [name, number, teamId, rookie],
                [card.name, card.number, card.teamId, card.rookie]
              )
        }
      />
    </FormContainer>
  );
}
