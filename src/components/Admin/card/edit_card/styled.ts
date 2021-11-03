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

export const Input = styled.input`
  width: 200px;
  height: 27px;
`;

export const LargeInput = styled.input`
  width: 250px;
  height: 27px;
`;

export const Select = styled.select`
  width: 200px;
  height: 27px;
`;

export const PlayerName = styled.div`
  margin-left: 10px;
  a {
    color: blue;
    text-decoration: underline;
  }
`;

export const NoPlayers = styled.div`
  color: gray;
  font-size: 0.9rem;
  margin: 10px;
`;

export const PlayerAddFail = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

export const PlayerAddSuccess = styled(PlayerAddFail)`
  color: green;
`;

export const NoteInstructions = styled.div`
  top: -15px;
  left: 60px;
  width: 210px;
  height: 65px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  font-size: 0.7rem;
  font-weight: 500;
  color: black;
  margin-top: 3px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

export const PlayerInstructions = styled(NoteInstructions)`
  top: 20px;
  width: 275px;
  height: 110px;
`;

export const HelpSpan = styled.span`
  display: inline-block;
  margin-left: 3px;
  height: 12px;
  width: 12px;
  cursor: default;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin: 20px 0 20px 0;
`;

export const ScrapeCardCount = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;
