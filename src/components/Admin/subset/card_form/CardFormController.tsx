import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { PlayersState, Player } from "../../../../store/library/players/types";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../../store/library/teams/thunks";
import { updateCard } from "../../../../store/library/card/thunks";
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

  const [cardEdited, setCardEdited] = useState(false);
  const [cardCreated, setCardCreated] = useState(false);
  const [cardBulkCreated, setBulkCreated] = useState(false);

  // scrape card options
  const [includeNotes, setIncludeNotes] = useState(false);
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
  const [scrapedCardData, setScrapedCardData] = useState(props.scrapeCardsData);
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

  useEffect(() => {
    if (props.scrapeCardsData) {
      if (!addShortPrints) {
        setCurrentCardIdx(0);
        // filter out short prints
        setScrapedCardData(
          props.scrapeCardsData.filter((cardData) => {
            if (
              !addShortPrints &&
              cardData.attributes.some((a) => a === "SP" || a === "SSP")
            ) {
              return false;
            }
            if (
              scrapedCardsAdded.some(
                (a) => a.number === cardData.number && a.name === cardData.name
              )
            ) {
              return false;
            }
            return true;
          })
        );
      } else {
        // only show short prints
        setScrapedCardData(
          props.scrapeCardsData.filter((cardData) => {
            if (
              !scrapedCardsAdded.some(
                (a) => a.number === cardData.number && a.name === cardData.name
              ) &&
              cardData.attributes.some((a) => a === "SP" || a === "SSP")
            ) {
              return true;
            }
            return false;
          })
        );
      }
    }
  }, [addShortPrints, props.scrapeCardsData]);

  // close modal on successful bulk add of cards
  useEffect(() => {
    if (bulkAddStatus === "SUCCESS" && cardBulkCreated) {
      props.handleClose();
    }
  }, [bulkAddStatus, cardBulkCreated]);

  useEffect(() => {
    if (updateCardStatus === "SUCCESS" && cardEdited) {
      props.handleClose();
    }
  }, [updateCardStatus, cardEdited]);

  useEffect(() => {
    if (createCardStatus === "SUCCESS" && cardCreated) {
      if (scrapedCardData) {
        setCardCreated(false);
        // check if the card added was the last one in the scrapedCardData array
        if (scrapedCardData.length === 1) {
          props.handleClose();
        } else {
          // if user added last card in array, step currentCardIdx down one to avoid out of bounds error
          if (currentCardIdx === scrapedCardData.length - 1) {
            setCurrentCardIdx(currentCardIdx - 1);
          }

          setScrapedCardData(
            scrapedCardData.filter((cardData, idx) => {
              if (currentCardIdx === idx) {
                setScrapedCardsAdded([...scrapedCardsAdded, cardData]);
                return false;
              }
              return true;
            })
          );
        }
      } else {
        props.handleClose();
      }
    }
  }, [createCardStatus, cardCreated, currentCardIdx, scrapedCardData, props]);

  // skip to next scraped card
  function nextCard() {
    if (scrapedCardData && currentCardIdx < scrapedCardData.length - 1) {
      setCurrentCardIdx(currentCardIdx + 1);
    }
  }

  // skip to previous scraped card
  function previousCard() {
    if (currentCardIdx > 0) {
      setCurrentCardIdx(currentCardIdx - 1);
    }
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
    }
  }

  function addPlayer(player: Player) {
    setPlayers([...players, player]);
  }

  function deletePlayer(id: number) {
    setPlayers(players.filter((player) => player.id !== id));
  }

  function createAllScrapedCards() {
    if (scrapedCardData) {
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
  }

  function createNewCard() {
    setCardCreated(true);
    if (scrapedCardData) {
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
  if (loadingInitialData) {
    return <LoadingDots />;
  }

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
  if (scrapedCardData) {
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
              note: includeNotes ? currentFormData.note : "",
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
                } short print cards were detected and removed from the list. Short prints should be added to their own separate subset and should not part of the base set. If you want to add the short print cards, check the box above to view them.`}</Styled.SpMessage>
              </>
            )}
        </Styled.ScrapeOptions>
        <Styled.ScrapeCardCount>{`Card ${currentCardIdx + 1} of ${
          scrapedCardData.length
        }`}</Styled.ScrapeCardCount>
        <Styled.ButtonContainer>
          <StyledButton
            color="BLUE"
            width="110px"
            height="30px"
            onClick={createAllScrapedCards}
          >
            Create All
          </StyledButton>
          <StyledButton
            color="GRAY"
            width="110px"
            height="30px"
            onClick={previousCard}
          >
            Previous
          </StyledButton>
          <StyledButton
            color="GRAY"
            width="110px"
            height="30px"
            onClick={nextCard}
          >
            Next
          </StyledButton>
          <StyledButton
            color="GREEN"
            width="110px"
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
