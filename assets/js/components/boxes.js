import styled from "styled-components";

const Box = styled.div`
  position: relative;
  background-color: ${({ backgroundColor }) => backgroundColor || "black"};
  align-items: center;
  color: white;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  margin: 1rem 0;
  min-height: 30vh;
`;

export const FadeBox = styled(Box)`
  opacity: ${({ ratio }) => ratio || 1};
  width: 50%;
`;

export const WidthBox = styled(Box)`
  width: ${({ ratio }) => `${ratio * 100}%`};
`;
