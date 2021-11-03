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
import { CardFormData } from "./parseCards";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../../store/loading/reducer";
import * as Styled from "./styled";
import StyledButton from "../../components/StyledButton";
import { LoadingDots } from "../../../shared/Loading";
import parseCards from "./parseCards";
import { scrapeCardData } from "../../../../store/library/scrape/thunks";
import { clearScrapedCards } from "../../../../store/library/scrape/actions";
import ModalHeader from "../../components/modal/ModalHeader";

const loadingSelector = createLoadingSelector([
  "GET_ALL_PLAYERS",
  "GET_ALL_TEAMS",
]);
const scrapeCardsStatusSelector = createStatusSelector("SCRAPE_CARD_DATA");
const bulkScrapePlayerStatusSelector =
  createStatusSelector("BULK_CREATE_PLAYER");

interface Props {
  handleCancel(): void;
  subsetId: number;
}

export default function CardScrapeModal(props: Props) {
  const dispatch = useDispatch();

  const [url, setUrl] = useState("");
  const [scrapeInProgress, setScrapeInProgress] = useState(false);
  const [formData, setFormData] = useState<CardFormData[]>([]);
  const [playersMissing, setPlayersMissing] = useState(false);
  const [playersChecked, setPlayersChecked] = useState(false);
  const [noCardsFound, setNoCardsFound] = useState(false);

  // loading player and team data
  const loading = useSelector((state: RootState) => loadingSelector(state));
  // loading scraped card data
  const scrapeCardDataStatus = useSelector((state: RootState) =>
    scrapeCardsStatusSelector(state)
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
    if (
      scrapeCardDataStatus === "SUCCESS" &&
      !playersChecked &&
      scrapeInProgress
    ) {
      setPlayersChecked(true);

      if (scrapedCardData.length === 0) {
        setNoCardsFound(true);
      } else {
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
          setScrapeInProgress(false);
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
    }
  }, [
    scrapeCardDataStatus,
    scrapeInProgress,
    teams,
    scrapedCardData,
    players,
    dispatch,
    playersChecked,
  ]);

  useEffect(() => {
    if (bulkCreatePlayerStatus === "SUCCESS" && playersMissing) {
      setScrapeInProgress(false);
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
    setScrapeInProgress(true);
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
          <Styled.SmallPageWrapper>
            <ModalHeader title="Scrape Card Data" handleClose={handleClose} />
            <LoadingDots />
          </Styled.SmallPageWrapper>
        </ModalWindow>
      </ModalBackground>
    );
  }

  // waiting for server to scrape card data
  if (scrapeInProgress || noCardsFound) {
    return (
      <ModalBackground>
        <ModalWindow>
          <Styled.SmallPageWrapper>
            <ModalHeader title="Scrape Card Data" handleClose={handleClose} />
            {noCardsFound ? (
              "No Cards Found"
            ) : (
              <>
                <LoadingDots />
                {scrapeCardDataStatus === "REQUEST" &&
                  "Scraping Checklist Data..."}
                {bulkCreatePlayerStatus === "REQUEST" &&
                  "Adding Missing Players..."}
              </>
            )}
          </Styled.SmallPageWrapper>
        </ModalWindow>
      </ModalBackground>
    );
  }

  return (
    <ModalBackground>
      <ModalWindow>
        <ModalHeader title="Scrape Card Data" handleClose={handleClose} />
        {formData.length > 0 ? (
          <CardFormController
            scrapeCardsData={formData}
            handleClose={handleClose}
            subsetId={props.subsetId}
          />
        ) : (
          <Styled.SmallPageWrapper>
            <Styled.ContentWrapper>
              <Styled.InputContainer>
                <Styled.Label>
                  Enter TCDB Checklist URL (
                  <a
                    href="https://www.tcdb.com/Checklist.cfm/sid/241380/2021-Topps"
                    target="_blank"
                    rel="noopener"
                  >
                    Example
                  </a>
                  )
                </Styled.Label>
                <Styled.Input
                  type="text"
                  placeholder="tcdb url"
                  value={url}
                  onChange={handleInputChange}
                />
              </Styled.InputContainer>
              <Styled.Footer>
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
              </Styled.Footer>
            </Styled.ContentWrapper>
          </Styled.SmallPageWrapper>
        )}
      </ModalWindow>
    </ModalBackground>
  );
}
