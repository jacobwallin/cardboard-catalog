import styled from "styled-components";

export const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const AddedPlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

export const AddPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 5px 0;
  gap: 10px;
  width: 100%;
`;

export const CreatePlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin: 0px 0px 20px 0px;
  gap: 5px;
`;

export const UrlInput = styled.input`
  width: 225px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 0.85rem;
  font-weight: 300;
`;

export const UrlInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const CreatePlayerNote = styled.div`
  font-size: 0.8rem;
  color: gray;
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

export const NoPlayers = styled.div`
  color: black;
  font-size: 0.95rem;
  margin: 15px 0 10px 0;
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
  height: 85px;
  z-index: 2;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  font-size: 0.8rem;
  font-weight: 500;
  color: black;
  margin-top: 3px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

export const PlayerInstructions = styled(NoteInstructions)`
  top: 20px;
  width: 275px;
  height: 160px;
`;
export const IncludeNotesInstructions = styled(NoteInstructions)`
  top: 20px;
  width: 250px;
  height: 50px;
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
  gap: 10px;
  align-items: center;
  margin: 20px 0 20px 0;
`;

export const ScrapeCardCount = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;

export const ScrapeOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  margin-top: 30px;
`;
export const ScrapeOptionsTitle = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 3px;
`;
export const CheckboxContainer = styled.div`
  position: relative;
  display: flex;
  gap: 3px;
  align-items: center;
`;

export const Checkbox = styled.input`
  width: 14px;
  height: 14px;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.8rem;
`;

export const SpMessage = styled.div`
  color: red;
  font-size: 0.8rem;
`;

export const AddPlayerButton = styled.div`
  margin: 10px 0 0 0;
`;
