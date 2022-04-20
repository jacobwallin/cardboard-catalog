import React from "react";
import { Friendship } from "../../store/friends/types";
import StyledButton from "../Admin/components/StyledButton";
import StyledLink from "../Collection/shared/StyledLink";

export const friendColumns = (removeFriend: (friendshipId: number) => void) => [
  {
    name: "Username",
    selector: (row: Friendship) => row.user_one.username,
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: Friendship) => (
      <StyledLink to={`/collection/?uid=${row.user_two_id}`}>
        View Collection
      </StyledLink>
    ),
    minWidth: "125px",
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
