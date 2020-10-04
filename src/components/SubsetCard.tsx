import React from "react";

import { SubsetSummary } from "../store/library/types";

import { Link, useRouteMatch } from "react-router-dom";

interface Props {
  subset: SubsetSummary;
  totalCards: number;
  distinctCards: number;
}

const SubsetCard: React.FC<Props> = (props) => {
  const { url } = useRouteMatch();
  return (
    <Link to={`${url}/${props.subset.id}`}>
      <div className="set-card">
        <div className="set-card-name">{props.subset.name}</div>
        <div className="set-card-count">{`${props.distinctCards} Cards`}</div>
        <div className="set-card-total">
          {`${props.totalCards} cards in complete set`}
        </div>
      </div>
    </Link>
  );
};

export default SubsetCard;
