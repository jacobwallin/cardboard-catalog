import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import {
  fetchAllFriends,
  acceptFriendRequest,
  deleteFriendship,
  sendFriendRequest,
} from "../../store/friends/thunks";
import { clearSearchUser } from "../../store/friends/actions";
import { Friendship } from "../../store/friends/types";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import LogoutButton from "./LogoutButton";
import PageHeader from "../shared/PageHeader";
import * as Styled from "./styled";
import AddFriend from "./add-friend/AddFriend";
import StyledButton from "../Admin/components/StyledButton";
import DataTable from "react-data-table-component";
import {
  friendColumns,
  requestColumns,
  pendingColumns,
  Friend,
} from "./columns";
import { createStatusSelector } from "../../store/loading/reducer";
const sendFriendRequestStatusSelector = createStatusSelector(
  "SEND_FRIEND_REQUEST"
);

type FriendViews = "FRIENDS" | "PENDING" | "REQUESTS";

export default function Profile() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.userData);
  const friendships = useSelector(
    (state: RootState) => state.friends.friendships
  );
  const userSearch = useSelector(
    (state: RootState) => state.friends.userSearch
  );
  const sendRequestStatus = useSelector((state: RootState) =>
    sendFriendRequestStatusSelector(state)
  );

  const [acceptedFriends, setAcceptedFriends] = useState<Friend[]>([]);
  const [pendingFriendRequests, setPendingFriendRequests] = useState<
    Friendship[]
  >([]);
  const [friendRequests, setFriendRequests] = useState<Friendship[]>([]);
  const [friendsView, setFriendsView] = useState<FriendViews>("FRIENDS");

  const [addFriend, setAddFriend] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  useEffect(() => {
    dispatch(fetchAllFriends());
  }, [dispatch]);

  useEffect(() => {
    if (friendRequestSent && sendRequestStatus === "SUCCESS") {
      setFriendsView("PENDING");
      setAddFriend(false);
      dispatch(clearSearchUser());
    }
  }, [friendRequestSent, sendRequestStatus, dispatch]);

  useEffect(() => {
    let friends: Friend[] = [];
    let pending: Friendship[] = [];
    let requests: Friendship[] = [];

    // iterate through all relationships and filter by type
    friendships.forEach((f) => {
      if (f.status === "ACCEPTED") {
        friends.push({
          id: f.user_one_id === user.id ? f.user_two_id : f.user_one_id,
          username:
            f.user_one_id === user.id
              ? f.user_two.username
              : f.user_one.username,
        });
      } else if (f.user_one_id === user.id) pending.push(f);
      else requests.push(f);
    });
    console.log(friends, pending, requests, friendships);
    setAcceptedFriends(friends);
    setPendingFriendRequests(pending);
    setFriendRequests(requests);
  }, [friendships, user]);

  function changeFriendView(view: FriendViews) {
    setFriendsView(view);
  }

  function toggleAddFriend() {
    setAddFriend(!addFriend);
  }

  function sendRequest(friendId: number) {
    dispatch(sendFriendRequest(friendId));
    setFriendRequestSent(true);
  }
  function acceptRequest(friendshipId: number) {
    dispatch(acceptFriendRequest(friendshipId));
  }
  function rejectRequest(friendshipId: number) {
    dispatch(deleteFriendship(friendshipId));
  }
  function withdrawRequest(friendshipId: number) {
    dispatch(deleteFriendship(friendshipId));
  }
  function removeFriend(friendshipId: number) {
    dispatch(deleteFriendship(friendshipId));
  }

  function goToFriendCollection(friend: Friend) {
    // set friend id in collection

    navigate("/collection");
  }

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <PageHeader title="Your Profile">
          <LogoutButton />
        </PageHeader>
        <Styled.ProfileData>
          <Styled.Data>
            <Styled.DataTitle>Username</Styled.DataTitle>
            <Styled.DataField>{user.username}</Styled.DataField>
          </Styled.Data>
          <Styled.Data>
            <Styled.DataTitle>Email</Styled.DataTitle>
            <Styled.DataField>{user.email}</Styled.DataField>
          </Styled.Data>
          <Styled.Data>
            <Styled.DataTitle>Name</Styled.DataTitle>
            <Styled.DataField>{user.name ? user.name : "-"}</Styled.DataField>
          </Styled.Data>
        </Styled.ProfileData>
        <Styled.Friends>
          <PageHeader title="Friends">
            {addFriend ? (
              <StyledButton
                height="30px"
                width="100px"
                color="GRAY"
                onClick={toggleAddFriend}
              >
                Close
              </StyledButton>
            ) : (
              <StyledButton
                height="30px"
                width="100px"
                color="BLUE"
                onClick={toggleAddFriend}
              >
                Add Friend
              </StyledButton>
            )}
          </PageHeader>
          {addFriend ? (
            <AddFriend sendRequest={sendRequest} />
          ) : (
            <>
              <Styled.FriendViews>
                <Styled.View
                  onClick={() => changeFriendView("FRIENDS")}
                  selected={friendsView === "FRIENDS"}
                >
                  Friends
                </Styled.View>
                <Styled.View
                  onClick={() => changeFriendView("REQUESTS")}
                  selected={friendsView === "REQUESTS"}
                >
                  Requests
                  <Styled.QtyBubble quantity={friendRequests.length}>
                    {friendRequests.length}
                  </Styled.QtyBubble>
                </Styled.View>
                <Styled.View
                  onClick={() => changeFriendView("PENDING")}
                  selected={friendsView === "PENDING"}
                >
                  Pending
                  <Styled.QtyBubble quantity={pendingFriendRequests.length}>
                    {pendingFriendRequests.length}
                  </Styled.QtyBubble>
                </Styled.View>
              </Styled.FriendViews>
              {friendsView === "FRIENDS" &&
                (acceptedFriends.length > 0 ? (
                  <Styled.FriendTableContainer>
                    <Styled.TableTitle>Your Friends</Styled.TableTitle>
                    <DataTable
                      noHeader
                      columns={friendColumns(
                        removeFriend,
                        goToFriendCollection
                      )}
                      data={acceptedFriends}
                      dense
                      pagination
                    />
                  </Styled.FriendTableContainer>
                ) : (
                  <Styled.NoFriends>
                    You have not added any friends yet.
                  </Styled.NoFriends>
                ))}
              {friendsView === "REQUESTS" &&
                (friendRequests.length > 0 ? (
                  <Styled.FriendTableContainer>
                    <Styled.TableTitle>Friend Requests</Styled.TableTitle>
                    <DataTable
                      noHeader
                      columns={requestColumns(acceptRequest, rejectRequest)}
                      data={friendRequests}
                      dense
                    />
                  </Styled.FriendTableContainer>
                ) : (
                  <Styled.NoFriends>
                    You have no friend requests to respond to
                  </Styled.NoFriends>
                ))}
              {friendsView === "PENDING" &&
                (pendingFriendRequests.length > 0 ? (
                  <Styled.FriendTableContainer>
                    <Styled.TableTitle>Friend Requests Sent</Styled.TableTitle>
                    <DataTable
                      noHeader
                      columns={pendingColumns(withdrawRequest)}
                      data={pendingFriendRequests}
                      dense
                    />
                  </Styled.FriendTableContainer>
                ) : (
                  <Styled.NoFriends>
                    You have no pending friend requests
                  </Styled.NoFriends>
                ))}
            </>
          )}
        </Styled.Friends>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
