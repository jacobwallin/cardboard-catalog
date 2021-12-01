import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { PlayersState, Player } from "../../../../store/library/players/types";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../../store/library/teams/thunks";
import { updateCard } from "../../../../store/library/subsets/thunks";
import {
  createCard,
  bulkCreateCard,
} from "../../../../store/library/subsets/thunks";
import StyledButton from "../../components/StyledButton";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../../store/loading/reducer";
import detectFormChanges from "../../detectFormChanges";
import { checkIfAdded, checkIfShortPrint } from "./utils";
import { CardFormData } from "../../subset/scrape_cards/parseCards";
import CardForm from "./CardForm";
import { LoadingDots } from "../../../shared/Loading";
import IncludeNoteHelp from "./IncludeNoteHelp";
import * as Styled from "./styled";

const loadingSelector = createLoadingSelector([
  "GET_ALL_PLAYERS",
  "GET_ALL_TEAMS",
]);

const bulkAddStatusSelector = createStatusSelector("BULK_CREATE_CARD");
const createCardStatusSelector = createStatusSelector("CREATE_CARD");
const updateCardStatusSelector = createStatusSelector("UPDATE_CARD");

interface Props {
  editCardData?: {
    cardDataId: number;
    name: string;
    number: string;
    rookie: boolean;
    note: string;
    teamId: number | undefined;
    players: PlayersState;
  };
  scrapeCardsData?: CardFormData[];
  subsetId: number;
  handleClose(): void;
}

export default function CardFormController(props: Props) {
  const dispatch = useDispatch();

  // loading player and team data
  const loadingInitialData = useSelector((state: RootState) =>
    loadingSelector(state)
  );
  // status selectors for creating and updating cards
  const bulkAddStatus = useSelector((state: RootState) =>
    bulkAddStatusSelector(state)
  );
  const createCardStatus = useSelector((state: RootState) =>
    createCardStatusSelector(state)
  );
  const updateCardStatus = useSelector((state: RootState) =>
    updateCardStatusSelector(state)
  );

  const [loadingPlayersTeams, setLoadingPlayersTeams] = useState(true);
  const [cardEdited, setCardEdited] = useState(false);
  const [cardCreated, setCardCreated] = useState(false);
  const [cardBulkCreated, setBulkCreated] = useState(false);

  // scrape card options
  const [includeNotes, setIncludeNotes] = useState(true);
  const [addShortPrints, setAddShortPrints] = useState(false);

  // Controlled form data, initial values are set to editCardData prop if form is being used to edit an existing card
  const { editCardData } = props;
  const [name, setName] = useState(editCardData ? editCardData.name : "");
  const [number, setNumber] = useState(editCardData ? editCardData.number : "");
  const [rookie, setRookie] = useState(
    editCardData ? editCardData.rookie : false
  );
  const [teamId, setTeamId] = useState(
    editCardData ? editCardData.teamId : undefined
  );
  const [note, setNote] = useState(editCardData ? editCardData.note : "");
  const [players, setPlayers] = useState<PlayersState>(
    editCardData
      ? editCardData.players.map((player) => {
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
      : []
  );

  // bulk add form data will be passed as a prop if the form is being used for data scraping
  const [scrapedCardData, setScrapedCardData] = useState<CardFormData[]>([]);
  // keeps track of what card from scraped data is shown in form
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  // keeps track of what cards have been added so when options are toggled they are filtered out
  const [scrapedCardsAdded, setScrapedCardsAdded] = useState<CardFormData[]>(
    []
  );

  // fetch players and teams, unless scraping since they will have already been fetched
  useEffect(() => {
    if (!props.scrapeCardsData) {
      dispatch(fetchAllPlayers());
      dispatch(fetchAllTeams());
    }
  }, [props.scrapeCardsData]);

  // filter form data on scrape options
  useEffect(() => {
    if (props.scrapeCardsData) {
      const newData = props.scrapeCardsData
        .filter((card) => {
          if (addShortPrints) return checkIfShortPrint(card);
          return !checkIfShortPrint(card);
        })
        .map((card) => {
          if (includeNotes) return card;
          return {
            ...card,
            note: "",
          };
        });

      setScrapedCardData(newData);
    }
  }, [addShortPrints, includeNotes, props.scrapeCardsData]);

  // remove form data when card is added
  useEffect(() => {
    if (scrapedCardData.length === 1) {
      props.handleClose();
    } else {
      setScrapedCardData((currentData) => {
        return currentData.filter(
          (card) => !checkIfAdded(card, scrapedCardsAdded)
        );
      });
    }
  }, [scrapedCardsAdded]);

  // make sure current index is not out of bounds
  useEffect(() => {
    if (
      currentCardIdx > scrapedCardData.length - 1 &&
      scrapedCardData.length !== 0
    ) {
      setCurrentCardIdx(scrapedCardData.length - 1);
    }
  }, [currentCardIdx, scrapedCardData]);

  // close modal when bulk add or edit is successful
  useEffect(() => {
    if (bulkAddStatus === "SUCCESS" && cardBulkCreated) {
      props.handleClose();
    }
  }, [bulkAddStatus, cardBulkCreated, props]);

  useEffect(() => {
    if (updateCardStatus === "SUCCESS" && cardEdited) {
      props.handleClose();
    }
  }, [updateCardStatus, cardEdited, props]);

  // handle when a card is successfully added
  useEffect(() => {
    if (createCardStatus === "SUCCESS" && cardCreated) {
      if (props.scrapeCardsData) {
        setCardCreated(false);
        // check if the card added was the last one in the scrapedCardData array
        if (scrapedCardData.length === 1) {
          props.handleClose();
        } else {
          setScrapedCardsAdded([
            ...scrapedCardsAdded,
            scrapedCardData[currentCardIdx],
          ]);
        }
      } else {
        props.handleClose();
      }
    }
  }, [
    createCardStatus,
    cardCreated,
    currentCardIdx,
    scrapedCardData,
    props,
    scrapedCardsAdded,
  ]);

  // skip to next scraped card
  function nextCard() {
    if (currentCardIdx < scrapedCardData.length - 1) {
      setCurrentCardIdx(currentCardIdx + 1);
    }
  }

  // skip to previous scraped card
  function previousCard() {
    if (currentCardIdx > 0) {
      setCurrentCardIdx(currentCardIdx - 1);
    }
  }

  function removeCard() {
    // "remove" card by adding it to the list of cards already added
    setScrapedCardsAdded([
      ...scrapedCardsAdded,
      scrapedCardData[currentCardIdx],
    ]);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    switch (event.target.name) {
      case "nameField":
        if (props.scrapeCardsData) {
          setScrapedCardData(
            scrapedCardData.map((c, idx) => {
              if (idx === currentCardIdx) {
                return { ...c, name: event.target.value };
              }
              return c;
            })
          );
        } else {
          setName(event.target.value);
        }
        break;
      case "numberField":
        if (props.scrapeCardsData) {
          setScrapedCardData(
            scrapedCardData.map((c, idx) => {
              if (idx === currentCardIdx) {
                return { ...c, number: event.target.value };
              }
              return c;
            })
          );
        } else {
          setNumber(event.target.value);
        }
        break;
      case "note":
        if (props.scrapeCardsData) {
          setScrapedCardData(
            scrapedCardData.map((c, idx) => {
              if (idx === currentCardIdx) {
                return { ...c, note: event.target.value };
              }
              return c;
            })
          );
        } else {
          setNote(event.target.value);
        }
        break;
      case "rookie":
        if (props.scrapeCardsData) {
          setScrapedCardData(
            scrapedCardData.map((c, idx) => {
              if (idx === currentCardIdx) {
                return { ...c, rookie: !c.rookie };
              }
              return c;
            })
          );
        } else {
          setRookie(!rookie);
        }
        break;
    }
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    switch (event.target.name) {
      case "team":
        if (props.scrapeCardsData) {
          setScrapedCardData(
            scrapedCardData.map((c, idx) => {
              if (idx === currentCardIdx) {
                return { ...c, teamId: +value };
              }
              return c;
            })
          );
        } else {
          setTeamId(+value);
        }
        break;
    }
  }

  function addPlayer(player: Player) {
    if (props.scrapeCardsData) {
      setScrapedCardData(
        scrapedCardData.map((c, idx) => {
          if (idx === currentCardIdx) {
            return { ...c, players: [...c.players, player] };
          }
          return c;
        })
      );
    } else {
      setPlayers([...players, player]);
    }
  }

  function deletePlayer(id: number) {
    if (props.scrapeCardsData) {
      setScrapedCardData(
        scrapedCardData.map((c, idx) => {
          if (idx === currentCardIdx) {
            const newPlayers = c.players.filter((p) => p.id !== id);
            return { ...c, players: newPlayers };
          }
          return c;
        })
      );
    } else {
      setPlayers(players.filter((player) => player.id !== id));
    }
  }

  function createAllScrapedCards() {
    setBulkCreated(true);
    dispatch(
      bulkCreateCard(
        props.subsetId,
        scrapedCardData.map((c) => {
          const { number, name, rookie, teamId, note, players } = c;
          return {
            number,
            name,
            rookie,
            teamId: teamId || null,
            note,
            playerIds: players.map((p) => p.id),
          };
        })
      )
    );
  }

  function createNewCard() {
    setCardCreated(true);
    if (props.scrapeCardsData) {
      dispatch(
        createCard(props.subsetId, {
          name: scrapedCardData[currentCardIdx].name,
          number: scrapedCardData[currentCardIdx].number,
          rookie: scrapedCardData[currentCardIdx].rookie,
          teamId: scrapedCardData[currentCardIdx].teamId || null,
          note: scrapedCardData[currentCardIdx].note,
          playerIds: scrapedCardData[currentCardIdx].players.map((p) => p.id),
        })
      );
    } else {
      dispatch(
        createCard(props.subsetId, {
          name,
          number,
          rookie,
          teamId: teamId || null,
          note,
          playerIds: players.map((p) => p.id),
        })
      );
    }
  }

  function editCard() {
    setCardEdited(true);
    if (props.editCardData) {
      dispatch(
        updateCard(props.editCardData?.cardDataId, {
          name,
          number,
          rookie,
          teamId,
          note,
          playerIds: players.map((p) => p.id),
        })
      );
    }
  }

  // wait until players and teams have loaded to render any form
  // if (loadingInitialData) {
  //   return <LoadingDots />;
  // }

  // edit existing card
  if (props.editCardData) {
    return (
      <>
        <CardForm
          formData={{ name, number, rookie, teamId, note, players }}
          addPlayer={addPlayer}
          deletePlayer={deletePlayer}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
        <Styled.ButtonContainer>
          <StyledButton
            color="GREEN"
            width="150px"
            height="30px"
            onClick={editCard}
            disabled={
              !detectFormChanges(
                [
                  props.editCardData.name,
                  props.editCardData.number,
                  props.editCardData.rookie,
                  props.editCardData.teamId,
                  props.editCardData.note,
                  props.editCardData.players.map((p) => p.id),
                ],
                [name, number, rookie, teamId, note, players.map((p) => p.id)]
              )
            }
          >
            Save Changes
          </StyledButton>
        </Styled.ButtonContainer>
      </>
    );
  }

  // create multiple cards from scraped data
  if (props.scrapeCardsData) {
    // get data of current card for form, if ignore SP filter makes data array e
    const currentFormData = scrapedCardData[currentCardIdx];
    return (
      <>
        {currentFormData && (
          <CardForm
            formData={{
              name: currentFormData.name,
              number: currentFormData.number,
              rookie: currentFormData.rookie,
              teamId: currentFormData.teamId,
              note: currentFormData.note,
              players: currentFormData.players,
            }}
            addPlayer={addPlayer}
            deletePlayer={deletePlayer}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        )}
        <Styled.ScrapeOptions>
          <Styled.ScrapeOptionsTitle>Options</Styled.ScrapeOptionsTitle>
          {props.scrapeCardsData &&
            props.scrapeCardsData.some((c) => c.note !== "") && (
              <Styled.CheckboxContainer>
                <Styled.Checkbox
                  type="checkbox"
                  checked={includeNotes}
                  onChange={(e) => setIncludeNotes(!includeNotes)}
                />
                <Styled.CheckboxLabel>
                  Include Notes
                  <IncludeNoteHelp />
                </Styled.CheckboxLabel>
              </Styled.CheckboxContainer>
            )}

          {props.scrapeCardsData &&
            props.scrapeCardsData.some((c) => {
              return c.attributes.some((a) => a === "SP" || a === "SSP");
            }) && (
              <>
                <Styled.CheckboxContainer>
                  <Styled.Checkbox
                    type="checkbox"
                    checked={addShortPrints}
                    onChange={(e) => setAddShortPrints(!addShortPrints)}
                  />
                  <Styled.CheckboxLabel>Add Short Prints</Styled.CheckboxLabel>
                </Styled.CheckboxContainer>
                <Styled.SpMessage>{`${
                  props.scrapeCardsData.filter((c) => {
                    return c.attributes.some((a) => a === "SP" || a === "SSP");
                  }).length
                } short print cards were detected and removed from the list. Short prints should be added to their own separate subset and should not be part of the base set. If you want to add the short print cards, check the box above to view them separately.`}</Styled.SpMessage>
              </>
            )}
        </Styled.ScrapeOptions>
        <Styled.ScrapeCardCount>
          {`Card ${currentCardIdx + 1} of ${scrapedCardData.length}`}
          {
            <span style={{ color: "blue", fontWeight: 600 }}>
              {addShortPrints && " SP"}
            </span>
          }
        </Styled.ScrapeCardCount>
        <Styled.ButtonContainer>
          <StyledButton
            color="BLUE"
            width="100px"
            height="30px"
            onClick={createAllScrapedCards}
            disabled={bulkAddStatus === "REQUEST"}
          >
            Create All
          </StyledButton>
          <StyledButton
            color="GRAY"
            width="100px"
            height="30px"
            onClick={previousCard}
          >
            Previous
          </StyledButton>
          <StyledButton
            color="GRAY"
            width="100px"
            height="30px"
            onClick={nextCard}
          >
            Next
          </StyledButton>
          <StyledButton
            color="RED"
            width="100px"
            height="30px"
            onClick={removeCard}
          >
            Remove
          </StyledButton>
          <StyledButton
            color="GREEN"
            width="100px"
            height="30px"
            onClick={createNewCard}
            disabled={createCardStatus === "REQUEST"}
          >
            Create Card
          </StyledButton>
        </Styled.ButtonContainer>
      </>
    );
  }

  // create new card
  return (
    <>
      <CardForm
        formData={{ name, number, rookie, teamId, note, players }}
        addPlayer={addPlayer}
        deletePlayer={deletePlayer}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
      <Styled.ButtonContainer>
        <StyledButton
          color="GREEN"
          width="150px"
          height="30px"
          onClick={createNewCard}
          disabled={
            name === "" || number === "" || createCardStatus === "REQUEST"
          }
        >
          Create Card
        </StyledButton>
      </Styled.ButtonContainer>
    </>
  );
}
