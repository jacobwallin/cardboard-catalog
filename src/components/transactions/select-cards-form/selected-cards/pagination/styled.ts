import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  color: #555;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    fill: #555;
  }
`;

export const TotalCards = styled.div`
  margin-left: auto;
  font-size: 0.9rem;
  color: black;
  font-weight: 500;
`;

export const RowsPerPage = styled.select`
  cursor: pointer;
  height: 24px;
  min-width: 24px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding-left: 8px;
  padding-right: 12px;
  box-sizing: content-box;
  font-size: 0.9rem;
  color: inherit;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  direction: ltr;
`;

export const RowsPerPageLabel = styled.label`
  font-size: 0.9rem;
`;

export const RowsContainer = styled.div`
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 7px;
  position: relative;
  svg {
    top: 0;
    right: 0;
    color: inherit;
    position: absolute;
    fill: currentColor;
    width: 24px;
    height: 24px;
    display: inline-block;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
  }
`;

export const PageStatus = styled.div`
  margin: 0 10px 0 10px;
  font-size: 0.9rem;
`;

export const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  &:hover {
    background: #ddd;
    cursor: pointer;
  }
`;
