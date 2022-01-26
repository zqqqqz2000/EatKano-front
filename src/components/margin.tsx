import React from "react";
import styled from "@emotion/styled";

export type MarginProps = {left?: string, right?: string, top?: string, bottom?: string}

export const Margin = styled.div<MarginProps>`
  margin-top: ${props => props.top ?? '0px'};
  margin-bottom: ${props => props.bottom ?? '0px'};
  margin-left: ${props => props.left ?? '0px'};
  margin-right: ${props => props.right ?? '0px'};
`;
