import React from "react";
import styled from "styled-components";
import SignatureIcon from "./signature.svg";
import JerseyIcon from "./jersey2.svg";
import PrismIcon from "./prism.svg";

const Container = styled.div`
  white-space: nowrap;
`;

const Number = styled.div`
  font-size: inherit;
  font-size: 12px;
`;

const Attributes = styled.div`
  /* white-space: "nowrap"; */
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const Serialized = styled.div`
  color: #daa520;
  font-size: 11px;
`;

const Rookie = styled.div`
  color: #d40015;
  font-size: 11px;
`;

const ShortPrint = styled.div`
  color: blue;
  font-size: 11px;
`;

const ManuRelic = styled.div`
  color: green;
  font-size: 11px;
`;

const Svg = styled.div`
  width: 14px;
  height: 14px;
`;

interface Props {
  number: string;
  serialized: number | null;
  shortPrint: boolean;
  auto: boolean;
  relic: boolean;
  manufacturedRelic: boolean;
  refractor: boolean;
  rookie: boolean;
}

export default function CardNumber(props: Props) {
  return (
    <Container>
      <Number>{props.number}</Number>

      <Attributes>
        {props.serialized && (
          <Serialized
            title={`serialized to ${props.serialized}`}
          >{`/${props.serialized}`}</Serialized>
        )}
        {props.rookie && <Rookie title="rookie">{" RC"}</Rookie>}
        {props.shortPrint && <ShortPrint title="short print">SP</ShortPrint>}
        {props.auto && (
          <Svg>
            <img src={SignatureIcon} alt="auto" title="auto" />
          </Svg>
        )}
        {props.relic && (
          <Svg>
            <img src={JerseyIcon} alt="relic" title="relic" />
          </Svg>
        )}
        {props.refractor && (
          <Svg>
            <img src={PrismIcon} alt="refractor" title="refractor" />
          </Svg>
        )}
        {props.manufacturedRelic && (
          <ManuRelic title="manufactured relic">MR</ManuRelic>
        )}
      </Attributes>
    </Container>
  );
}
