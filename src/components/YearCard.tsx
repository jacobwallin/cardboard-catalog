import React from "react";

interface Props {
  yearData: {
    year: number;
    cardCount: number;
  };
}

const YearCard: React.FC<Props> = ({ yearData }) => {
  return (
    <div>
      <p>{yearData.year}</p>
      <p>{yearData.cardCount}</p>
    </div>
  );
};

export default YearCard;
