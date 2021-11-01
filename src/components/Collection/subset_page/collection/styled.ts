import styled from "styled-components";

export const Collection = styled.div`
  align-self: flex-start;
  margin: 0px 0 30px 0px;
  display: flex;
  flex-direction: column;
  width: 225px;
  align-items: left;
`;

export const CardCount = styled.div`
  font-size: 0.8rem;
  margin-bottom: 5px;
  margin-left: 12px;
  font-weight: 600;
`;

export const ProgressBar = styled.div`
  width: 225px;
  height: 24px;
  /* border-radius: 6px; */
  background-color: lightgray;
`;

export const Progress = styled.div<{ percentage: number }>`
  background-color: rgb(0, 74, 206);
  border-radius: inherit;
  height: 100%;
  line-height: 24px;
  width: ${(props) => `${props.percentage * 2.25}px`};
  color: black;
  text-indent: 15px;
  white-space: nowrap;
`;

export const SetComplete = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;

export const Svg = styled.div`
  width: 30px;
  height: 30px;
`;

export const CompleteMessage = styled.div`
  color: green;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;
