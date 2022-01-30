import styled from "@emotion/styled";

export const Text = styled.div<{ color?: string, size?: string, weight?: number | string }>`
  color: ${props => props.color ?? 'black'};
  font-size: ${props => props.size ?? '100%'};
  font-weight: ${props => props.weight ?? 'normal'};
  font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
`;