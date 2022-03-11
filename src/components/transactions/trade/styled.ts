import styled from "styled-components";

export const StepContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

export type StepStatus = "ACTIVE" | "INACTIVE" | "COMPLETE";

export const TradeStep = styled.div<{ status: StepStatus }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  align-items: center;
  width: 125px;
  height: 50px;
  border: ${(props) => {
    switch (props.status) {
      case "ACTIVE":
        return "1px solid black";
      case "INACTIVE":
        return "1px solid lightgray";
      case "COMPLETE":
        return "1px solid green";
    }
  }};
  border-radius: 5px;
  color: ${(props) => props.status === "INACTIVE" && "gray"};
`;

export const StepNumber = styled.div`
  font-size: 0.8em;
`;

export const StepTitle = styled.div`
  font-size: 0.9em;
  font-weight: 500;
  text-align: center;
`;
