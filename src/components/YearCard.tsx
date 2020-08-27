import React from "react";

interface Props {
  yearData: {
    year: number;
    cardCount: number;
  };
}

const YearCard = ({ yearData }: Props) => {
  return (
    <div>
      <p>{yearData.year}</p>
      <p>{yearData.cardCount}</p>
    </div>
  );
};

export default YearCard;
