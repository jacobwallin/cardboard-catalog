import React from "react";
import { Player } from "../../../../../store/library/players/types";
import * as Styled from "./styled";
import { ReactComponent as LinkIcon } from "../shared/link.svg";
import LinkIconWrapper from "../shared/Link";
import { ReactComponent as CloseIcon } from "../../../components/modal/close.svg";

interface Props {
  player: Player;
  deletePlayer(id: number): void;
}

export default function PlayerCard(props: Props) {
  const { player } = props;
  return (
    <Styled.PlayerAdded key={player.id}>
      <Styled.Container>
        <Styled.RemoveIconWrapper onClick={() => props.deletePlayer(player.id)}>
          <CloseIcon />
        </Styled.RemoveIconWrapper>
        <Styled.PlayerName>{player.name}</Styled.PlayerName>
      </Styled.Container>
      <LinkIconWrapper
        href={player.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkIcon />
      </LinkIconWrapper>
    </Styled.PlayerAdded>
  );
}
