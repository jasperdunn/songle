import { theme } from 'common/theme'
import styled from 'styled-components'

export const Button = styled.button`
  border: 0;
  background-color: ${theme.color.secondary.background};
  height: fit-content;
  width: fit-content;
  padding: 4px;
  margin: 0;
  display: inline-flex;
  :not(:disabled) {
    cursor: pointer;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &.active:not(:disabled),
  &:active:not(:disabled) {
    filter: brightness(1.4);
  }
`
