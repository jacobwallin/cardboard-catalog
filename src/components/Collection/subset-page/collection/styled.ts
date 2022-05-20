import styled from "styled-components";

export const Collection = styled.div`
  align-self: flex-start;
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
  width: 225px;
  align-items: left;
`;

export const CardCount = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
`;

export const ProgressBar = styled.div`
  width: 225px;
  height: 24px;
  background-color: #bbb;
  border-radius: 5px;
  overflow: hidden;
`;

export const Progress = styled.div<{ percentage: number }>`
  background-color: rgb(0, 74, 206);
  height: 100%;
  line-height: 24px;
  width: ${(props) => `${props.percentage * 2.25}px`};
  color: white;
  text-indent: 15px;
  white-space: nowrap;
  overflow: visible;
`;

export const CardsInCollection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  align-items: center;
  margin-bottom: 3px;
`;

export const Svg = styled.div`
  width: 25px;
  height: 25px;
`;

export const CompleteMessage = styled.div`
  color: green;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const CollectionSummary = styled.div`
  align-self: flex-start;
`;
