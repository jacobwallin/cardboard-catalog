import React from "react";

import { Card } from "../store/library/subsets/types";

import defaultCardImg from "../player_card_default.png";

interface Props {
  card: Card;
  quantity: number;
  color: string;
}

const PlayerCard = (props: Props) => {
  const className =
    props.quantity > 0 ? "player-card" : "player-card not-in-collection";
  return (
    <div className={className} style={{ border: `3px solid ${props.color}` }}>
      <div className="player-card-image">
        <img src={defaultCardImg} alt="baseball player default" />
      </div>
      <div className="player-card-info">
        <div className="player-name">{props.card.card_datum.name}</div>
        <div className="player-team">{props.card.card_datum.team.name}</div>
        <div className="player-card-number">{`#${props.card.card_datum.number}`}</div>
      </div>
    </div>
  );
};

export default PlayerCard;
