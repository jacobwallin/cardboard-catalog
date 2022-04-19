import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { fetchAllFriends } from "../../store/friends/thunks";
import { Friendship } from "../../store/friends/types";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import LogoutButton from "../navbar/logout/LogoutButton";
import PageHeader from "../shared/PageHeader";
import * as Styled from "./styled";

import DataTable from "react-data-table-component";

type FriendViews = "FRIENDS" | "PENDING" | "REQUESTS";

const columns = [
  {
    name: "Username",
    selector: (row: Friendship) => row.user_one.username,
    sortable: true,
  },
];

export default function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.userData);
  const friendships = useSelector(
    (state: RootState) => state.friends.friendships
  );
  const userSearch = useSelector(
    (state: RootState) => state.friends.userSearch
  );

  const [acceptedFriends, setAcceptedFriends] = useState<Friendship[]>([]);
  const [pendingFriendRequests, setPendingFriendRequests] = useState<
    Friendship[]
  >([]);
  const [friendRequests, setFriendRequests] = useState<Friendship[]>([]);

  const [friendsView, setFriendsView] = useState<FriendViews>("FRIENDS");

  useEffect(() => {
    dispatch(fetchAllFriends());
  }, [dispatch]);

  useEffect(() => {
    let friends: Friendship[] = [];
    let pending: Friendship[] = [];
    let requests: Friendship[] = [];

    // iterate through all relationships and filter by type
    friendships.forEach((f) => {
      if (f.status === "ACCEPTED") friends.push(f);
      else if (f.user_one_id === user.id) pending.push(f);
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

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <PageHeader title="Your Profile" />
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
          <PageHeader title="Friends" />
          <Styled.FriendViews>
            <Styled.View onClick={() => changeFriendView("FRIENDS")}>
              Friends
            </Styled.View>
            <Styled.View onClick={() => changeFriendView("REQUESTS")}>
              Requests
              <Styled.QtyBubble quantity={friendRequests.length}>
                {friendRequests.length}
              </Styled.QtyBubble>
            </Styled.View>
            <Styled.View onClick={() => changeFriendView("PENDING")}>
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
                  columns={columns}
                  data={acceptedFriends}
                  dense
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
                <Styled.TableTitle>Pending Requests Received</Styled.TableTitle>
                <DataTable
                  noHeader
                  columns={columns}
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
                <Styled.TableTitle>Pending Requests Received</Styled.TableTitle>
                <DataTable
                  noHeader
                  columns={columns}
                  data={pendingFriendRequests}
                  dense
                />
              </Styled.FriendTableContainer>
            ) : (
              <Styled.NoFriends>
                You have no pending friend requests
              </Styled.NoFriends>
            ))}
        </Styled.Friends>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
