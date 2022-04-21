import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import styled from "styled-components";
import { viewMyCollection } from "../../../store/collection/browse/actions";

const ReturnButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 10px;
  height: 22px;
  width: 150px;
  font-size: 0.8rem;
  color: #555;
  cursor: pointer;
  background-color: #ddd;
  border-radius: 3px;
  align-self: flex-start;
  margin: 0 0 0 20px;
  &:hover {
    background-color: #bbb;
  }
`;

export default function ReturnToMyCollection() {
  const dispatch = useDispatch();
  const collectionFriend = useSelector(
    (state: RootState) => state.collection.browse.friend
  );

  function showMyCollection() {
    dispatch(viewMyCollection());
  }

  return (
    <>
      {collectionFriend.id !== 0 && (
        <ReturnButton onClick={showMyCollection}>
          Return to My Collection
        </ReturnButton>
      )}
    </>
  );
}
