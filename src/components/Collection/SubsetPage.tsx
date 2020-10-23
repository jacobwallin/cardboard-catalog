import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import { fetchSubset } from "../../store/library/subsets/thunks";
import { fetchCardsInSingleSubset } from "../../store/collection/thunks";
import SubsetPageHeader from "./SubsetPageHeader";
import SubsetPageCards from "./SubsetPageCards";

type Params = {
  year: string;
  setId: string;
  subsetId: string;
};

const SubsetPage = (props: RouteComponentProps<Params>) => {
  const dispatch = useDispatch();

  const librarySubset = useSelector(
    (state: RootState) => state.library.subsets.singleSubset
  );
  const subsetUserCards = useSelector(
    (state: RootState) => state.collection.cardsInSingleSubset.cards
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

  if (librarySubset.id === SUBSET_ID_PARAM) {
    return (
      <>
        <div id="subset-header">
          <h1 className="subset-name">{librarySubset.name}</h1>
        </div>
        <SubsetPageHeader
          handleSeries={handleSeriesChange}
          handleShowAll={handleShowAllChange}
          selectedSeriesId={selectedSeriesId}
          showAllCards={showAllCards}
        />
        <div className="player-card-container">
          <SubsetPageCards
            showAllCards={showAllCards}
            selectedSeriesId={selectedSeriesId}
          />
        </div>
      </>
    );
  } else {
    return <div>---LOADING SUBSET DATA---</div>;
  }
};

export default SubsetPage;
