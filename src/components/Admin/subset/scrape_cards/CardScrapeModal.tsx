import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../../store/library/teams/thunks";
import { createCard } from "../../../../store/library/subsets/thunks";
import CardForm from "../../card/edit_card/CardForm";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import { CardFormData } from "./parseCards";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../../store/loading/reducer";
import GrayButton from "./GrayButton";
import * as Styled from "./styled";

import parseCards from "./parseCards";

const creatingCardSelector = createLoadingSelector(["CREATE_CARD"]);
const creatingCardStatusSelector = createStatusSelector("CREATE_CARD");

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
  const creatingCardStatus = useSelector((state: RootState) =>
    creatingCardStatusSelector(state)
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

  function removeCurrentCard() {
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

    setCreatedCardIdx(currentCardIdx);
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
    if (creatingCardStatus === "SUCCESS" && createdCardIdx !== -1) {
      // remove card form data if card is successfully created in db
      setParsedCards(parsedCards.filter((card, idx) => idx !== createdCardIdx));
      setCreatedCardIdx(-1);
    }
  }, [creatingCardStatus, createdCardIdx, parsedCards]);

  useEffect(() => {
    dispatch(fetchAllPlayers());
    dispatch(fetchAllTeams());
  }, []);

  return (
    <ModalBackground>
      <ModalWindow>
        {showForm && parsedCards.length > 0 ? (
          <>
            <Styled.Header>{`Card ${currentCardIdx + 1} of ${
              parsedCards.length
            }`}</Styled.Header>
            <CardForm
              createNew={false}
              bulkAddData={parsedCards[currentCardIdx]}
              handleCancel={removeCurrentCard}
              handleSubmit={handleFormSubmit}
            />
            <Styled.Footer>
              <GrayButton onClick={props.handleCancel}>Close</GrayButton>
              <GrayButton
                disabled={currentCardIdx === 0}
                onClick={previousCard}
              >
                Previous
              </GrayButton>
              <GrayButton
                disabled={currentCardIdx >= parsedCards.length - 1}
                onClick={nextCard}
              >
                Next
              </GrayButton>
            </Styled.Footer>
          </>
        ) : (
          <>
            <Styled.Header>{`Bulk Add Cards to Subset`}</Styled.Header>
            <Styled.TextArea
              rows={10}
              value={scrapedCards}
              onChange={textAreaChange}
              placeholder="paste card data here"
            />
            <Styled.Footer>
              <GrayButton onClick={props.handleCancel}>Close</GrayButton>
              <GrayButton onClick={parseData}>Parse Data</GrayButton>
            </Styled.Footer>
          </>
        )}
      </ModalWindow>
    </ModalBackground>
  );
}
