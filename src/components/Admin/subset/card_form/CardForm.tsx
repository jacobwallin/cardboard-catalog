import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import { PlayersState, Player } from "../../../../store/library/players/types";
import NoteHelp from "./NoteHelp";
import PlayerHelp from "./PlayerHelp";
import StyledButton from "../../components/StyledButton";
import { scrapeNewPlayer } from "../../../../store/library/players/thunks";
import PlayerCard from "./player-card/PlayerCard";
import * as Styled from "./styled";
import * as StyledInputs from "../../components/form/Inputs";

import { createStatusSelector } from "../../../../store/loading/reducer";
const scrapePlayerStatusSelector = createStatusSelector("CREATE_PLAYER");

interface Props {
  formData: {
    name: string;
    number: string;
    rookie: boolean;
    note: string;
    teamId: number | undefined;
    players: PlayersState;
  };
  addPlayer(player: Player): void;
  deletePlayer(id: number): void;
  handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
}

export default function CardForm(props: Props) {
  const dispatch = useDispatch();

  const [playerFilter, setPlayerFilter] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState(0);
  const [playerScrapeUrl, setPlayerScrapeUrl] = useState("");
  const [showPlayerAddedMessage, setShowPlayerAddedMessage] = useState(false);

  const teams = useSelector((state: RootState) => state.library.teams);
  const players = useSelector((state: RootState) => state.library.players);
  const scrapePlayerStatus = useSelector((state: RootState) =>
    scrapePlayerStatusSelector(state)
  );

  // automatically set selected player when searching
  useEffect(() => {
    if (playerFilter === "") {
      setSelectedPlayerId(0);
    } else {
      const playersFound = players
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
  }, [playerFilter, players]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    switch (event.target.name) {
      case "playerFilter":
        setPlayerFilter(event.target.value);
        break;
      case "scrapeUrl":
        setPlayerScrapeUrl(event.target.value);
        break;
    }
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    switch (event.target.name) {
      case "selectedPlayerId":
        setSelectedPlayerId(+value);
        break;
    }
  }

  function addPlayer() {
    if (selectedPlayerId !== 0) {
      if (
        // prevent adding same player multiple times
        props.formData.players.findIndex(
          (player) => player.id === selectedPlayerId
        ) === -1
      ) {
        const playerToAdd = players.find(
          (player) => player.id === selectedPlayerId
        )!;
        props.addPlayer(playerToAdd);
      }
    }
  }

  function scrapePlayer() {
    setShowPlayerAddedMessage(true);
    dispatch(scrapeNewPlayer(playerScrapeUrl));
  }

  function clearPlayerFilter() {
    setPlayerFilter("");
    setSelectedPlayerId(0);
  }

  return (
    <>
      <FieldContainer>
        <FieldTitle>Number</FieldTitle>
        <FieldData>
          <StyledInputs.NumberInput
            name="numberField"
            autoComplete="off"
            type="text"
            value={props.formData.number}
            placeholder="Enter Number"
            onChange={props.handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Card Name</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            name="nameField"
            autoComplete="off"
            type="text"
            value={props.formData.name}
            placeholder="Enter Card Name"
            onChange={props.handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Player(s) on Card
          <PlayerHelp />
        </FieldTitle>
        <FieldData>
          <Styled.PlayersContainer>
            <Styled.AddPlayerContainer>
              <StyledInputs.Input
                type="text"
                name="scrapeUrl"
                placeholder="Baseball Reference URL"
                autoComplete="off"
                value={playerScrapeUrl}
                onChange={handleInputChange}
              />
              <StyledButton
                color="GRAY"
                height="33px"
                width="125px"
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
              <StyledInputs.Input
                type="text"
                name="playerFilter"
                placeholder="Filter Players"
                autoComplete="off"
                value={playerFilter}
                onChange={handleInputChange}
              />
              <StyledButton
                color="GRAY"
                height="33px"
                width="75px"
                onClick={clearPlayerFilter}
              >
                Clear
              </StyledButton>
            </Styled.AddPlayerContainer>
            <Styled.AddPlayerContainer>
              <StyledInputs.Select
                name="selectedPlayerId"
                value={selectedPlayerId}
                onChange={handleSelectChange}
              >
                <option value={0}>Select Player</option>
                {players
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
              </StyledInputs.Select>
              <StyledButton
                color="BLUE"
                height="33px"
                width="75px"
                onClick={addPlayer}
              >
                Add
              </StyledButton>
            </Styled.AddPlayerContainer>
            <Styled.AddedPlayersContainer>
              {props.formData.players.length > 0 ? (
                props.formData.players.map((player) => {
                  return (
                    <PlayerCard
                      player={player}
                      deletePlayer={props.deletePlayer}
                    />
                  );
                })
              ) : (
                <Styled.NoPlayers>
                  No players have been added to this card.
                </Styled.NoPlayers>
              )}
            </Styled.AddedPlayersContainer>
          </Styled.PlayersContainer>
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Team</FieldTitle>
        <FieldData>
          <StyledInputs.Select
            name="team"
            value={props.formData.teamId}
            onChange={props.handleSelectChange}
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
          </StyledInputs.Select>
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Rookie</FieldTitle>
        <FieldData>
          <input
            type="checkbox"
            name="rookie"
            checked={props.formData.rookie}
            onChange={props.handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Note
          <NoteHelp />
        </FieldTitle>
        <FieldData>
          <StyledInputs.LargeInput
            name="note"
            type="text"
            autoComplete="off"
            value={props.formData.note}
            placeholder="Enter Note"
            onChange={props.handleInputChange}
          />
        </FieldData>
      </FieldContainer>
    </>
  );
}
