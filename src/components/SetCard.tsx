import React from "react";

import { Set } from "../store/collection/types";

import { Link, useRouteMatch } from "react-router-dom";

interface Props {
  set: Set;
}

const SetCard: React.FC<Props> = (props) => {
  const { url } = useRouteMatch();
  return (
    <Link to={`${url}/${props.set.id}`}>
      <div className="set-card">
        <div className="set-card-name">{props.set.name}</div>
        <div className="set-card-count">{`${props.set.Cards} Cards`}</div>
        <div className="set-card-total">
          {`${props.set.totalCards} cards in complete set`}
        </div>
      </div>
    </Link>
  );
};

export default SetCard;
