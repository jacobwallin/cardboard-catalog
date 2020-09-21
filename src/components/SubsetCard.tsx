import React from "react";

import { Subset } from "../store/collection/types";

import { Link, useRouteMatch } from "react-router-dom";

interface Props {
  subset: Subset;
}

const SubsetCard: React.FC<Props> = (props) => {
  const { url } = useRouteMatch();
  return (
    <Link to={`${url}/${props.subset.subsetId}`}>
      <div className="set-card">
        <div className="set-card-name">{props.subset.subsetName}</div>
        <div className="set-card-count">{`${props.subset.totalCards} Cards`}</div>
        <div className="set-card-total">
          {`${props.subset.totalCards} cards in complete set`}
        </div>
      </div>
    </Link>
  );
};

export default SubsetCard;
