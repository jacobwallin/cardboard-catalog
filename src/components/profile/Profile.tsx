import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import LogoutButton from "../navbar/logout/LogoutButton";
import PageHeader from "../shared/PageHeader";
import * as Styled from "./styled";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.userData);
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
        <Styled.Friends></Styled.Friends>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
