import React from "react";

import { Link, useRouteMatch } from "react-router-dom";

interface Props {
  set: {
    setId: number;
    setName: string;
    setDescription: string;
    year: number;
    distinctCards: string;
    totalCards: string;
  };
}

const SetCard: React.FC<Props> = (props) => {
  const { url } = useRouteMatch();
  return (
    <Link to={`${url}/${props.set.setId}`}>
      <div className="set-card">
        <div className="set-card-name">{props.set.setName}</div>
        <div className="set-card-count">{`${props.set.totalCards} Cards`}</div>
      </div>
    </Link>
  );
};

export default SetCard;
