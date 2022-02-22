import styled from "styled-components";
import { Link } from "react-router-dom";

export const TransactionLink = styled(Link)`
  width: 100px;
  height: 75px;
  border: 1px solid gray;
  border-radius: 5px;

  &:hover {
    color: red;
  }
`;

export const Header = styled.div`
  font-size: 1.5em;
  font-weight: 400;
  margin-left: 10px;
  margin-bottom: 20px;
`;

export const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  margin-bottom: 50px;
`;
