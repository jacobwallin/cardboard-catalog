import React from "react";
import { Friendship } from "../../store/friends/types";
import StyledButton from "../Admin/components/StyledButton";
import StyledLink from "../Collection/shared/StyledLink";

export interface Friend {
  id: number;
  username: string;
}

export const friendColumns = (
  removeFriend: (friendshipId: number) => void,
  goToCollection: (friend: Friend) => void
) => [
  {
    name: "Username",
    selector: (row: Friend) => row.username,
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Friend) => (
      <StyledButton
        width="130px"
        height="25px"
        color="BLUE"
        onClick={() => goToCollection(row)}
      >
        View Collection
      </StyledButton>
    ),
    minWidth: "160px",
    grow: 0,
  },
];

export const requestColumns = (
  accept: (friendshipId: number) => void,
  reject: (friendshipId: number) => void
) => [
  {
    name: "Username",
    selector: (row: Friendship) => row.user_one.username,
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Friendship) => (
      <StyledButton
        width="75px"
        height="25px"
        color="RED"
        onClick={() => reject(row.id)}
      >
        Reject
      </StyledButton>
    ),
    grow: 0,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Friendship) => (
      <StyledButton
        width="75px"
        height="25px"
        color="GREEN"
        onClick={() => accept(row.id)}
      >
        Accept
      </StyledButton>
    ),
    grow: 0,
  },
];

export const pendingColumns = (withdraw: (friendshipId: number) => void) => [
  {
    name: "Username",
    selector: (row: Friendship) => row.user_one.username,
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Friendship) => (
      <StyledButton
        width="75px"
        height="25px"
        color="RED"
        onClick={() => withdraw(row.id)}
      >
        Retract
      </StyledButton>
    ),
    grow: 0,
  },
];
