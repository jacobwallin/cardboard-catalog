import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../store";
import { fetchSubset } from "../store/library/thunks";
import { fetchCardsInSingleSubset } from "../store/collection/thunks";
import SubsetHeader from "./SubsetHeader";
import SubsetCardsBySeries from "./SubsetCardsBySeries";
import SubsetsAllUserCards from "./SubsetsAllUserCards";

type TParams = {
  year: string;
  setId: string;
  subsetId: string;
};

const Subset = (props: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();

  const librarySubset = useSelector(
    (state: RootState) => state.library.singleSubset
  );
  const subsetUserCards = useSelector(
    (state: RootState) => state.collection.cardsInSingleSubset
  );

  let [selectedSeriesId, setSelectedSeriesId] = useState(0);
  let [showAllCards, setShowAllCards] = useState(false);

  const SUBSET_ID_PARAM = +props.match.params.subsetId;

  useEffect(() => {
    // get the complete subset data from the library api and all the user's cards that belong to the subset from the collection api
    if (
      librarySubset.id !== SUBSET_ID_PARAM ||
      subsetUserCards.length === 0 ||
      subsetUserCards[0].card.series.subsetId !== SUBSET_ID_PARAM
    ) {
      dispatch(fetchSubset(SUBSET_ID_PARAM));
      dispatch(fetchCardsInSingleSubset(SUBSET_ID_PARAM));
    }
  }, []);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }
  function handleShowAllChange(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setShowAllCards(!showAllCards);
  }

  if (
    librarySubset.id === SUBSET_ID_PARAM &&
    subsetUserCards.length > 0 &&
    subsetUserCards[0].card.series.subsetId === SUBSET_ID_PARAM
  ) {
    return (
      <>
        <div id="subset-header">
          <h1 className="subset-name">{librarySubset.name}</h1>
        </div>
        <SubsetHeader
          handleSeries={handleSeriesChange}
          handleShowAll={handleShowAllChange}
          selectedSeriesId={selectedSeriesId}
          showAllCards={showAllCards}
        />
        <div className="player-card-container">
          {selectedSeriesId !== 0 ? (
            <SubsetCardsBySeries
              showAllCards={showAllCards}
              selectedSeriesId={selectedSeriesId}
            />
          ) : (
            <SubsetsAllUserCards />
          )}
        </div>
      </>
    );
  } else {
    return <div>---LOADING SUBSET DATA---</div>;
  }
};

export default Subset;
