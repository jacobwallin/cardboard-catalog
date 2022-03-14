import styled from "styled-components";
import { Link } from "react-router-dom";

export const TransactionLink = styled(Link)`
  width: 110px;
  height: 40px;
  border: 1px solid gray;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 0.9rem;
  &:hover {
    font-weight: 500;
    border: 1px solid black;
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
  margin: 0 0 50px 25px;
  align-self: flex-start;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
