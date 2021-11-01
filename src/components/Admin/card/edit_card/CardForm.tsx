import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { PlayersState } from "../../../../store/library/players/types";
import {
  fetchAllPlayers,
  scrapeNewPlayer,
} from "../../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../../store/library/teams/thunks";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormContainer from "../../components/form/FormContainer";
import FormButtons from "../../components/form/FormButtons";
import StyledButton from "../../components/StyledButton";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../../store/loading/reducer";
import detectFormChanges from "../../detectFormChanges";
import * as Styled from "./styled";

const loadingSelector = createLoadingSelector([
  "GET_ALL_PLAYERS",
  "GET_ALL_TEAMS",
]);

const cardLoadingSelector = createLoadingSelector([
  "UPDATE_CARD",
  "CREATE_CARD",
]);

const scrapePlayerStatusSelector = createStatusSelector("CREATE_PLAYER");

interface Props {
  createNew: boolean;
  bulkAddData?: {
    name: string;
    number: string;
    rookie: boolean;
    note: string;
    teamId: number | undefined;
    players: PlayersState;
  };
  handleCancel(): void;
  handleSubmit(
    name: string,
    number: string,
    rookie: boolean,
    teamId: number | undefined,
    note: string,
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
  const isLoading = useSelector((state: RootState) =>
    cardLoadingSelector(state)
  );
  const scrapePlayerStatus = useSelector((state: RootState) =>
    scrapePlayerStatusSelector(state)
  );

  // set the initial values to card state if the form is being used to edit a card data
  const [name, setName] = useState(props.createNew ? "" : card.name);
  const [number, setNumber] = useState(props.createNew ? "" : card.number);
  const [rookie, setRookie] = useState(props.createNew ? false : card.rookie);
  const [teamId, setTeamId] = useState(
    !props.createNew && card.teamId ? card.teamId : undefined
  );
  const [note, setNote] = useState(props.createNew ? "" : card.note);
  const [players, setPlayers] = useState<PlayersState>(
    props.createNew
      ? []
      : card.players.map((player) => {
          return {
            id: player.id,
            name: player.name,
            fullName: player.fullName,
            birthday: player.birthday,
            hallOfFame: player.hallOfFame,
            url: "",
            createdAt: "",
            updatedAt: "",
          };
        })
  );
  const [playerFilter, setPlayerFilter] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState(0);
  const [playerScrapeUrl, setPlayerScrapeUrl] = useState("");
  const [showPlayerAddedMessage, setShowPlayerAddedMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchAllPlayers());
    dispatch(fetchAllTeams());
  }, []);

  // automatically prefill card name to player name
  useEffect(() => {
    if (players.length === 1 && !props.bulkAddData) {
      setName(players[0].name);
    }
  }, [players, props.bulkAddData]);

  useEffect(() => {
    if (props.bulkAddData) {
      const data = props.bulkAddData;
      setName(data.name);
      setNumber(data.number);
      setRookie(data.rookie);
      setTeamId(data.teamId);
      setPlayers(data.players);
    }
  }, [props.bulkAddData]);

  useEffect(() => {
    if (playerFilter === "") {
      setSelectedPlayerId(0);
    } else {
      const playersFound = allPlayers
        .filter((player) => {
          return player.name.toLowerCase().includes(playerFilter.toLowerCase());
        })
        .sort((playerA, playerB) => {
          if (playerA.name < playerB.name) {
            return -1;
          }
          if (playerA.name > playerB.name) {
            return 1;
          }
          return 0;
        });

      if (playersFound.length > 0) {
        setSelectedPlayerId(playersFound[0].id);
      }
    }
  }, [playerFilter, allPlayers]);

  function handleSubmit() {
    props.handleSubmit(
      name,
      number,
      rookie,
      teamId,
      note,
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
      case "scrapeUrl":
        setPlayerScrapeUrl(event.target.value);
        break;
      case "note":
        setNote(event.target.value);
        break;
      case "rookie":
        setRookie(!rookie);
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

  function clearPlayerFilter() {
    setPlayerFilter("");
    setSelectedPlayerId(0);
  }

  function scrapePlayer() {
    setShowPlayerAddedMessage(true);
    dispatch(scrapeNewPlayer(playerScrapeUrl));
  }

  return (
    <FormContainer>
      <FieldContainer>
        <FieldTitle>Number</FieldTitle>
        <FieldData>
          <input
            name="numberField"
            autoComplete="off"
            type="text"
            value={number}
            placeholder="Enter Number"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Card Name</FieldTitle>
        <FieldData>
          <input
            name="nameField"
            autoComplete="off"
            type="text"
            value={name}
            placeholder="Enter Card Name"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Player(s) on Card</FieldTitle>
        <FieldData>
          <Styled.PlayersContainer>
            <Styled.AddPlayerContainer>
              <Styled.PlayerFilter
                type="text"
                name="scrapeUrl"
                placeholder="Baseball Reference URL"
                autoComplete="off"
                value={playerScrapeUrl}
                onChange={handleInputChange}
              />
              <StyledButton
                color="GRAY"
                height="25px"
                width="100px"
                onClick={scrapePlayer}
              >
                Add Player
              </StyledButton>
            </Styled.AddPlayerContainer>
            {scrapePlayerStatus === "SUCCESS" &&
              showPlayerAddedMessage === true && (
                <Styled.PlayerAddSuccess>
                  Player Added Successfully
                </Styled.PlayerAddSuccess>
              )}
            {scrapePlayerStatus === "FAILURE" &&
              showPlayerAddedMessage === true && (
                <Styled.PlayerAddFail>Error Adding Player</Styled.PlayerAddFail>
              )}

            <Styled.AddPlayerContainer>
              <Styled.PlayerFilter
                type="text"
                name="playerFilter"
                placeholder="Filter Players"
                autoComplete="off"
                value={playerFilter}
                onChange={handleInputChange}
              />
              <StyledButton
                color="GRAY"
                height="25px"
                width="50px"
                onClick={clearPlayerFilter}
              >
                Clear
              </StyledButton>
            </Styled.AddPlayerContainer>
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
            {players.length > 0 ? (
              players.map((player) => {
                return (
                  <Styled.CurrentPlayersContainer key={player.id}>
                    <StyledButton
                      color="RED"
                      height="25px"
                      width="25px"
                      onClick={() => deletePlayer(player.id)}
                    >
                      X
                    </StyledButton>
                    <Styled.PlayerName>
                      <a href={player.url} target="_blank" rel="noopener">
                        {player.name}
                      </a>
                    </Styled.PlayerName>
                  </Styled.CurrentPlayersContainer>
                );
              })
            ) : (
              <Styled.NoPlayers>
                No players have been added to this card.
              </Styled.NoPlayers>
            )}
          </Styled.PlayersContainer>
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Team</FieldTitle>
        <FieldData>
          <select
            name="team"
            value={teamId}
            onChange={handleSelectChange}
            disabled={loadingInitialData}
          >
            <option value={undefined}>Select Team</option>
            {teams
              .sort((teamA, teamB) => {
                if (teamA.name < teamB.name) {
                  return -1;
                }
                if (teamA.name > teamB.name) {
                  return 1;
                }
                return 0;
              })
              .map((team) => {
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
        <FieldTitle>Rookie</FieldTitle>
        <FieldData>
          <input
            type="checkbox"
            name="rookie"
            checked={rookie}
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Note</FieldTitle>
        <FieldData>
          <input
            name="note"
            type="text"
            autoComplete="off"
            value={note}
            placeholder="Enter Note"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FormButtons
        handleCancel={props.handleCancel}
        handleSubmit={handleSubmit}
        disabled={
          isLoading ||
          (props.createNew
            ? name === "" || number === ""
            : !detectFormChanges(
                [
                  name,
                  number,
                  teamId,
                  rookie,
                  players.map((player) => player.id),
                  note,
                ],
                [
                  card.name,
                  card.number,
                  card.teamId,
                  card.rookie,
                  card.players.map((player) => player.id),
                  card.note,
                ]
              ))
        }
      />
    </FormContainer>
  );
}
