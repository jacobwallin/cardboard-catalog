import React from "react";

import { Link, useRouteMatch } from "react-router-dom";

interface Props {
  set: {
    setId: number;
    name: string;
    distinctCards: number;
    totalCards: number;
  };
}

const SetCard: React.FC<Props> = (props) => {
  const { url } = useRouteMatch();
  return (
    <Link to={`${url}/${props.set.setId}`}>
      <div className="set-card">
        <div className="set-card-name">{props.set.name}</div>
        <div className="set-card-count">{`${props.set.totalCards} Cards`}</div>
        <div className="set-card-total">
          {`${props.set.totalCards} cards in complete set`}
        </div>
      </div>
    </Link>
  );
};

export default SetCard;
