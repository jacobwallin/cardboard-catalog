import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { fetchAllPlayers } from "../../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../../store/library/teams/thunks";
import CardFormController from "../../card/edit_card/CardFormController";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import { CardFormData } from "./parseCards";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import GrayButton from "./GrayButton";
import { ModalTitle } from "../styled";
import * as Styled from "./styled";
import StyledButton from "../../components/StyledButton";
import { LoadingDots } from "../../../shared/Loading";
import parseCards from "./parseCards";
import { scrapeCardData } from "../../../../store/library/scrape/thunks";

const loadingSelector = createLoadingSelector([
  "GET_ALL_PLAYERS",
  "GET_ALL_TEAMS",
]);
const scrapeCardsLoadingSelector = createLoadingSelector(["SCRAPE_CARD_DATA"]);

interface Props {
  handleCancel(): void;
  subsetId: number;
}

export default function CardScrapeModal(props: Props) {
  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const [parsedCards, setParsedCards] = useState<CardFormData[]>([]);

  // loading player and team data
  const loading = useSelector((state: RootState) => loadingSelector(state));
  // loading scraped card data
  const scrapeCardDataLoading = useSelector((state: RootState) =>
    scrapeCardsLoadingSelector(state)
  );

  const players = useSelector((state: RootState) => state.library.players);
  const teams = useSelector((state: RootState) => state.library.teams);
  const scrapedCardData = useSelector(
    (state: RootState) => state.library.scrape
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrl(event.target.value);
  }

  // fetch player and team data on mount
  useEffect(() => {
    dispatch(fetchAllPlayers());
    dispatch(fetchAllTeams());
  }, []);

  // dispatch scraped card data thunk
  function handleScrapeCardData() {
    dispatch(scrapeCardData(url));
  }

  // parse scraped card data once it is received
  useEffect(() => {
    // find missing players at this step????
    if (scrapedCardData.length > 0) {
      setParsedCards(parseCards(scrapedCardData, teams, players));
    }
  }, [scrapedCardData]);

  // wait for player and team data to fetch before rendering modal
  if (loading) {
    return (
      <ModalBackground>
        <ModalWindow>
          <ModalTitle>Bulk Create Cards</ModalTitle>
          <LoadingDots />
        </ModalWindow>
      </ModalBackground>
    );
  }

  // waiting for server to scrape card data
  if (scrapeCardDataLoading) {
    return (
      <ModalBackground>
        <ModalWindow>
          <ModalTitle>Bulk Create Cards</ModalTitle>
          <LoadingDots />
          Scraping Card Data...
        </ModalWindow>
      </ModalBackground>
    );
  }

  return (
    <ModalBackground>
      <ModalWindow>
        {parsedCards.length > 0 ? (
          <CardFormController
            scrapeCardsData={parsedCards}
            handleClose={props.handleCancel}
            subsetId={props.subsetId}
          />
        ) : (
          <>
            <ModalTitle>Bulk Create Cards</ModalTitle>
            <Styled.Input
              type="text"
              placeholder="tcdb url"
              value={url}
              onChange={handleInputChange}
            />
            <StyledButton
              color="BLUE"
              width="125px"
              height="30px"
              onClick={handleScrapeCardData}
              disabled={
                !/^https:\/\/www.tcdb.com\/Checklist.cfm\/sid/.test(url)
              }
            >
              Scrape Cards
            </StyledButton>
            <Styled.Footer>
              <GrayButton onClick={props.handleCancel}>Close</GrayButton>
            </Styled.Footer>
          </>
        )}
      </ModalWindow>
    </ModalBackground>
  );
}
