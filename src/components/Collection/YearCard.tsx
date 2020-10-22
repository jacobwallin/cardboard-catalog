import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

interface Props {
  yearData: {
    year: number;
    distinctCards: number;
    totalCards: number;
  };
}

const YearCard: React.FC<Props> = ({ yearData }) => {
  const { path } = useRouteMatch();
  return (
    <Link to={`${path}/${yearData.year}`}>
      <div className="year-card">
        <p className="year-card-year">{yearData.year}</p>
        <p className="year-card-count">{`${yearData.distinctCards} Cards`}</p>
      </div>
    </Link>
  );
};

export default YearCard;
