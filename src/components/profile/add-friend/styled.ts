import styled from "styled-components";

export const AddFriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-end;
`;

export const UsernameInput = styled.input`
  width: 300px;
  height: 45px;
  font-size: 1.1rem;
  padding: 10px;

  @media only screen and (max-width: 500px) {
    width: 200px;
  }
`;

export const UsernameLabel = styled.label`
  font-size: 1rem;
  color: #555;
  margin-left: 10px;
  margin-bottom: 3px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserFoundContainer = styled.div`
  position: relative;
  width: 375px;
  padding: 10px;
  border-radius: 5px;
  background: #eee;
  border: 1px solid #ccc;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (max-width: 500px) {
    width: 320px;
  }
`;

export const UserFound = styled.div`
  color: green;
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: 0px;
`;

export const Username = styled.div`
  font-size: 1rem;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UsernameButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Close = styled.div`
  width: 25px;
  position: absolute;
  right: 5px;
  top: 5px;
  &:hover {
    cursor: pointer;
    .ex {
      fill: gray;
    }
  }
  &:active {
    .ex {
      fill: darkgray;
    }
  }
`;

export const AlreadyFriends = styled.div`
  font-size: 0.9rem;
  color: gray;
`;
