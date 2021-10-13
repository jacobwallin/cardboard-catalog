import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../../store/library/teams/thunks";
import { createCard } from "../../../../store/library/subsets/thunks";
import CardForm from "../../card/edit_card/CardForm";
import ModalBackground from "../../components/modal/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import { CardFormData } from "./parseCards";
import { createLoadingSelector } from "../../../../store/loading/reducer";

import parseCards from "./parseCards";

const creatingCardSelector = createLoadingSelector(["CREATE_CARD"]);

interface Props {
  handleCancel(): void;
  subsetId: number;
}

export default function CardScrapeModal(props: Props) {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [scrapedCards, setScrapedCards] = useState("");
  const [parsedCards, setParsedCards] = useState<CardFormData[]>([]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [createdCardIdx, setCreatedCardIdx] = useState(-1);

  const players = useSelector((state: RootState) => state.library.players);
  const teams = useSelector((state: RootState) => state.library.teams);
  const creatingCard = useSelector((state: RootState) =>
    creatingCardSelector(state)
  );

  function textAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setScrapedCards(event.target.value);
  }

  function parseData() {
    const tempCards = parseCards(scrapedCards, teams, players);
    setParsedCards(tempCards);

    if (tempCards.length > 0) {
      setShowForm(true);
    }
  }

  function handleFormCancel() {
    // remove card data from scraped cards
    setParsedCards(parsedCards.filter((card, idx) => idx !== currentCardIdx));
  }

  function handleFormSubmit(
    name: string,
    number: string,
    rookie: boolean,
    teamId: number | undefined,
    note: string,
    playerIds: number[]
  ) {
    // create card
    dispatch(
      createCard({
        subsetId: props.subsetId,
        name,
        number,
        rookie,
        teamId: teamId ? teamId : null,
        note,
        playerIds,
      })
    );

    // move on to next card
  }

  function nextCard() {
    if (currentCardIdx < parsedCards.length - 1) {
      setCurrentCardIdx(currentCardIdx + 1);
    }
  }

  function previousCard() {
    if (currentCardIdx > 0) {
      setCurrentCardIdx(currentCardIdx - 1);
    }
  }

  useEffect(() => {
    dispatch(fetchAllPlayers());
    dispatch(fetchAllTeams());
  }, []);

  return (
    <ModalBackground>
      <ModalWindow>
        {showForm && parsedCards.length > 0 ? (
          <>
            <h3>{`${parsedCards.length} Cards Found`}</h3>
            <CardForm
              createNew={false}
              bulkAddData={parsedCards[currentCardIdx]}
              handleCancel={handleFormCancel}
              handleSubmit={handleFormSubmit}
            />
            <button disabled={currentCardIdx === 0} onClick={previousCard}>
              Previous
            </button>
            <button
              disabled={currentCardIdx >= parsedCards.length - 1}
              onClick={nextCard}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <textarea
              rows={10}
              value={scrapedCards}
              onChange={textAreaChange}
              style={{ height: "200px", width: "100%" }}
            />
            <button onClick={parseData}>Parse Data</button>
          </>
        )}
        <button onClick={props.handleCancel}>Close</button>
      </ModalWindow>
    </ModalBackground>
  );
}

// first show textarea and parse button

// if valid cards are found, display prefilled form for each
// submit button on form creates card, cancel button removes it from array
// need buttons to step through array of potential cards
