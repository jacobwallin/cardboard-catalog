import React, { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useParams } from "react-router-dom";
import { SingleSet } from "../store/collection/types";
import { connect } from "react-redux";
import { RootState } from "../store";
import { fetchSingleSet } from "../store/collection/thunks";
import PlayerCard from "./PlayerCard";

const Set: React.FC<Props> = (props) => {
  const { setId } = useParams();

  useEffect(() => {
    if (props.set.id !== +setId) {
      props.getSingleSet(setId);
    }
  }, []);

  return (
    <div id="player-card-container">
      {props.set.id === +setId ? (
        props.set.Cards.map((card) => {
          return <PlayerCard key={card.id} card={card} />;
        })
      ) : (
        <h2>Loading Cards...</h2>
      )}
    </div>
  );
};

const mapState = (state: RootState): StateProps => {
  return {
    set: state.collection.singleSet,
  };
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    getSingleSet: (setId) => dispatch(fetchSingleSet(setId)),
  };
};

export default connect(mapState, mapDispatch)(Set);

interface StateProps {
  set: SingleSet;
}

interface DispatchProps {
  getSingleSet: (setId: number) => void;
}

type Props = StateProps & DispatchProps;
