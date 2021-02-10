import React from "react";

import { CardData, Series } from "../store/library/subsets/types";

import defaultCardImg from "../player_card_default.png";

interface Props {
  cardData: CardData;
  seriesData: Series;
  serialNumber: number | null;
  grade: number | null;
  gradingCompany: string | null;
  value: number | null;
  quantity: number;
}

const PlayerCard = (props: Props) => {
  const className =
    props.quantity > 0 ? "player-card" : "player-card not-in-collection";
  return (
    <div className={className}>
      <div className="player-card-image">
        <img src={defaultCardImg} alt="baseball player default" />
      </div>
      <div className="player-card-info">
        <div className="player-name">{props.cardData.name}</div>
        <div className="player-team">{props.cardData.team.name}</div>
        <div className="player-card-number">{`#${props.cardData.number}`}</div>
      </div>
    </div>
  );
};

export default PlayerCard;
