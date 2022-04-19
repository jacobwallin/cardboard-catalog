import React, { useState } from "react";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { searchUsername } from "../../../store/friends/thunks";
import { clearSearchUser } from "../../../store/friends/actions";
import * as Styled from "./styled";
import StyledButton from "../../Admin/components/StyledButton";
import { ReactComponent as XIcon } from "../../Admin/components/modal/close.svg";

export default function AddFriend() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.friends.userSearch);

  const [username, setUsername] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  function searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function search(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(searchUsername(username));
  }

  function clearFoundUser() {
    dispatch(clearSearchUser());
  }

  return (
    <Styled.AddFriendContainer>
      <form>
        <Styled.SearchContainer>
          <Styled.InputContainer>
            <Styled.UsernameLabel htmlFor="friend-search">
              Search user-name
            </Styled.UsernameLabel>
            <Styled.UsernameInput
              id="friend-search"
              value={username}
              onChange={searchChange}
              disabled={user.id !== 0}
              autoComplete="off"
            />
          </Styled.InputContainer>
          <StyledButton
            width="80px"
            height="45px"
            color="BLUE"
            onClick={search}
            disabled={username.length === 0 || user.id !== 0}
          >
            Search
          </StyledButton>
        </Styled.SearchContainer>
      </form>
      {user.id !== 0 && (
        <Styled.UserFoundContainer>
          <Styled.UserFound>User Found</Styled.UserFound>
          <Styled.Close onClick={clearFoundUser}>
            <XIcon />
          </Styled.Close>

          <Styled.UsernameButtonsContainer>
            <Styled.Username>{user.username}</Styled.Username>
            <StyledButton width="115px" height="30px" color="BLUE">
              Send Request
            </StyledButton>
          </Styled.UsernameButtonsContainer>
        </Styled.UserFoundContainer>
      )}
    </Styled.AddFriendContainer>
  );
}
