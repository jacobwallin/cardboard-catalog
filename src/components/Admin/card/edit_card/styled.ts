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
`;
export const AddPlayer = styled.div``;

export const PlayerFilter = styled.input`
  width: 175px;
  height: 25px;
  margin: 0px 10px 0 0;
`;

export const PlayerSelect = styled.select`
  width: 175px;
  height: 25px;
  margin: 10px 10px 10px 0;
`;

export const PlayerName = styled.div`
  margin-left: 10px;
`;
