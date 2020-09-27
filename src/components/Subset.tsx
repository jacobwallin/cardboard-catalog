import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../store";
import { fetchSubsetData } from "../store/library/thunks";
import { fetchSubsetUserCards } from "../store/collection/thunks";
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

  const librarySubset = useSelector((state: RootState) => state.library.subset);
  const subsetUserCards = useSelector(
    (state: RootState) => state.collection.singleSubset
  );

  let [selectedSeriesId, setSelectedSeriesId] = useState(0);
  let [showAllCards, setShowAllCards] = useState(false);

  useEffect(() => {
    // get the complete subset data from the library api and all the user's cards that belong to the subset from the collection api
    if (
      librarySubset.id !== +props.match.params.subsetId ||
      subsetUserCards.length === 0 ||
      subsetUserCards[0].card.series.subsetId !== +props.match.params.subsetId
    ) {
      dispatch(fetchSubsetData(+props.match.params.subsetId));
      dispatch(fetchSubsetUserCards(+props.match.params.subsetId));
    }
  }, []);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }
  function handleShowAllChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowAllCards(!showAllCards);
  }

  if (
    librarySubset.id === +props.match.params.subsetId &&
    subsetUserCards.length > 0 &&
    subsetUserCards[0].card.series.subsetId === +props.match.params.subsetId
  ) {
    return (
      <>
        <SubsetHeader
          handleSeries={handleSeriesChange}
          handleShowAll={handleShowAllChange}
          selectedSeriesId={selectedSeriesId}
          showAllCards={showAllCards}
        />
        {selectedSeriesId !== 0 ? (
          <SubsetCardsBySeries
            showAllCards={showAllCards}
            selectedSeriesId={selectedSeriesId}
          />
        ) : (
          <SubsetsAllUserCards />
        )}
      </>
    );
  } else {
    return <div>---LOADING SUBSET DATA---</div>;
  }
};

export default Subset;
