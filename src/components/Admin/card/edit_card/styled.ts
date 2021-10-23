import styled from "styled-components";

export const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
export const CurrentPlayersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5px;
`;
export const AddPlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0px 10px 10px 0;
  gap: 10px;
`;
export const AddPlayer = styled.div``;

export const PlayerFilter = styled.input`
  width: 175px;
  height: 25px;
`;

export const PlayerSelect = styled.select`
  width: 175px;
  height: 25px;
`;

export const PlayerName = styled.div`
  margin-left: 10px;
  a {
    color: black;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const NoPlayers = styled.div`
  color: gray;
  font-size: 0.9rem;
  margin: 10px;
`;
