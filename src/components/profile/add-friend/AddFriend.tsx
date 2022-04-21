import React, { useState } from "react";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { searchUsername } from "../../../store/friends/thunks";
import { clearSearchUser } from "../../../store/friends/actions";
import * as Styled from "./styled";
import StyledButton from "../../Admin/components/StyledButton";
import { ReactComponent as XIcon } from "../../Admin/components/modal/close.svg";

import { createStatusSelector } from "../../../store/loading/reducer";
const searchUsernameStatusSelector = createStatusSelector("SEARCH_USERNAME");

interface Props {
  sendRequest: (friendId: number) => void;
}

export default function AddFriend(props: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.friends.userSearch);
  const searchUsernameStatus = useSelector((state: RootState) =>
    searchUsernameStatusSelector(state)
  );

  const [username, setUsername] = useState("");
  const [searchedUsername, setSearchedUsername] = useState("");

  function searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function search(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(searchUsername(username));
    setSearchedUsername(username);
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
              disabled={user.user.id !== 0}
              autoComplete="off"
            />
          </Styled.InputContainer>
          <StyledButton
            width="80px"
            height="45px"
            color="BLUE"
            onClick={search}
            disabled={username.length === 0 || user.user.id !== 0}
          >
            Search
          </StyledButton>
        </Styled.SearchContainer>
        {searchUsernameStatus === "FAILURE" && searchedUsername !== "" && (
          <Styled.NotFound>
            {`could not find user "${searchedUsername}"`}
          </Styled.NotFound>
        )}
      </form>
      {user.user.id !== 0 && (
        <Styled.UserFoundContainer>
          <Styled.UserFound>User Found</Styled.UserFound>
          <Styled.Close onClick={clearFoundUser}>
            <XIcon />
          </Styled.Close>

          <Styled.UsernameButtonsContainer>
            <Styled.Username>{user.user.username}</Styled.Username>
            {!user.existingFriendship && (
              <StyledButton
                width="115px"
                height="30px"
                color="BLUE"
                onClick={() => props.sendRequest(user.user.id)}
              >
                Send Request
              </StyledButton>
            )}
            {user.existingFriendship &&
              user.existingFriendship.status === "ACCEPTED" && (
                <Styled.AlreadyFriends>
                  You are already friends
                </Styled.AlreadyFriends>
              )}
            {user.existingFriendship &&
              user.existingFriendship.status === "PENDING" && (
                <Styled.AlreadyFriends>
                  Friend request already exists
                </Styled.AlreadyFriends>
              )}
          </Styled.UsernameButtonsContainer>
        </Styled.UserFoundContainer>
      )}
    </Styled.AddFriendContainer>
  );
}
