import styled from "styled-components";

export const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 50px 0 0 10%;
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const DataTitle = styled.div`
  color: gray;
  font-size: 0.9rem;
  margin-left: 1px;
`;

export const DataField = styled.div`
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
`;

export const Friends = styled.div`
  width: 100%;
  border-top: 1px solid lightgray;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FriendViews = styled.div`
  display: flex;
  justify-content: center;
`;
export const View = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 40px;
  background: #ddd;

  &:hover {
    background: #999;
    cursor: pointer;
  }

  @media only screen and (max-width: 500px) {
    width: 100px;
    height: 35px;
    font-size: 0.9rem;
  }

  &:nth-child(1) {
    border-top: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    border-left: 1px solid #bbb;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &:nth-child(2) {
    border: 1px solid #bbb;
  }
  &:nth-child(3) {
    border-top: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    border-right: 1px solid #bbb;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export const FriendTableContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 30px;
`;

export const TableTitle = styled.div`
  margin-left: 30px;
  margin-bottom: 5px;
  align-self: flex-start;
  font-size: 1.2rem;
  font-weight: 500;
`;

export const NoFriends = styled.div`
  margin-top: 50px;
  font-size: 1rem;
  color: gray;
`;

export const QtyBubble = styled.span<{ quantity: number }>`
  margin-left: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  background: ${(props) => (props.quantity > 0 ? "blue" : "#aaa")};
  color: white;
  border-radius: 3px;
`;
