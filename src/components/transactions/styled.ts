import styled from "styled-components";
import { Link } from "react-router-dom";

export const TransactionLink = styled(Link)`
  width: 125px;
  height: 45px;
  border: 1px solid #bbb;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 0.9rem;
  background-color: #eee;
  &:hover {
    background-color: #bbb;
  }
`;

export const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 10px;
  margin-bottom: 20px;
  align-self: flex-start;
`;

export const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 20px 0 60px 25px;
  align-self: center;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
