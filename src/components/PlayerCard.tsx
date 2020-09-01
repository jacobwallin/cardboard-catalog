import React from "react";

import { Card } from "../store/collection/types";

import "./player-card-default.png";

interface Props {
  card: Card;
}

const PlayerCard: React.FC<Props> = (props) => {
  return (
    <div className="player-card">
      <div className="player-card-image">
        {/* <img src="player-card-default.png" alt="baseball player default" /> */}
      </div>
      <div className="player-card-info">
        <div className="player-name">{props.card.name}</div>
        <div className="player-team">{props.card.Team.name}</div>
        <div className="player-card-number">{`#${props.card.number}`}</div>
      </div>
    </div>
  );
};

export default PlayerCard;
