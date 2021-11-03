import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import {
  fetchAllPlayers,
  bulkScrapePlayers,
} from "../../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../../store/library/teams/thunks";
import CardFormController from "../../card/edit_card/CardFormController";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import { CardFormData, ParsedCards } from "./parseCards";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../../store/loading/reducer";
import GrayButton from "./GrayButton";
import { ModalTitle } from "../styled";
import * as Styled from "./styled";
import StyledButton from "../../components/StyledButton";
import { LoadingDots } from "../../../shared/Loading";
import parseCards from "./parseCards";
import { scrapeCardData } from "../../../../store/library/scrape/thunks";
import { clearScrapedCards } from "../../../../store/library/scrape/actions";

const loadingSelector = createLoadingSelector([
  "GET_ALL_PLAYERS",
  "GET_ALL_TEAMS",
]);
const scrapeCardsLoadingSelector = createLoadingSelector(["SCRAPE_CARD_DATA"]);
const bulkScrapePlayerStatusSelector =
  createStatusSelector("BULK_CREATE_PLAYER");

interface Props {
  handleCancel(): void;
  subsetId: number;
}

export default function CardScrapeModal(props: Props) {
  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const [parsedCards, setParsedCards] = useState<ParsedCards[]>([]);
  const [formData, setFormData] = useState<CardFormData[]>([]);
  const [playersMissing, setPlayersMissing] = useState(false);
  const [playersChecked, setPlayersChecked] = useState(false);

  // loading player and team data
  const loading = useSelector((state: RootState) => loadingSelector(state));
  // loading scraped card data
  const scrapeCardDataLoading = useSelector((state: RootState) =>
    scrapeCardsLoadingSelector(state)
  );
  // bulk scraping player data
  const bulkCreatePlayerStatus = useSelector((state: RootState) =>
    bulkScrapePlayerStatusSelector(state)
  );

  const players = useSelector((state: RootState) => state.library.players);
  const teams = useSelector((state: RootState) => state.library.teams);
  const scrapedCardData = useSelector(
    (state: RootState) => state.library.scrape
  );

  // fetch player and team data on mount
  useEffect(() => {
    dispatch(fetchAllPlayers());
    dispatch(fetchAllTeams());
  }, [dispatch]);

  // parse scraped card data once it is received
  useEffect(() => {
    if (scrapedCardData.length > 0 && !playersChecked) {
      setPlayersChecked(true);

      // parse data
      const parsed = parseCards(scrapedCardData, teams, players);

      // find missing players
      const missing = parsed.filter((parsedPlayer) => {
        return parsedPlayer.player && parsedPlayer.players.length === 0;
      });

      // dispatch bulk add players if missing, otherwise set form state
      if (missing.length > 0) {
        dispatch(bulkScrapePlayers(missing.map((m) => m.name)));
        // other useEffect will setFormData once bulk player creation is complete
        setPlayersMissing(true);
      } else {
        setFormData(
          parsed.map((p) => {
            return {
              name: p.name,
              number: p.number,
              rookie: p.rookie,
              teamId: p.teamId,
              note: p.note,
              players: p.players,
            };
          })
        );
      }
    }
  }, [scrapedCardData, teams, players, dispatch, playersChecked]);

  useEffect(() => {
    if (bulkCreatePlayerStatus === "SUCCESS" && playersMissing) {
      setPlayersMissing(false);
      setFormData(
        parseCards(scrapedCardData, teams, players).map((p) => {
          return {
            name: p.name,
            number: p.number,
            rookie: p.rookie,
            teamId: p.teamId,
            note: p.note,
            players: p.players,
          };
        })
      );
    }
  }, [bulkCreatePlayerStatus, playersMissing, teams, players, scrapedCardData]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrl(event.target.value);
  }

  // dispatch scraped card data thunk
  function handleScrapeCardData() {
    dispatch(scrapeCardData(url));
  }

  // clear scraped card data on modal close
  function handleClose() {
    dispatch(clearScrapedCards());
    props.handleCancel();
  }

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
        {formData.length > 0 ? (
          <CardFormController
            scrapeCardsData={formData}
            handleClose={handleClose}
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
