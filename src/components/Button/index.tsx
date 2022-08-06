import { theme } from 'common/theme'
import styled, { css } from 'styled-components'

type ButtonProps = {
  variant: 'primary' | 'secondary'
  light?: boolean
}
export const Button = styled.button<ButtonProps>`
  border: 0;
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          ${theme.color.primary.background}
        `

      case 'secondary':
        return css`
          ${theme.color.secondary.background}
        `

      default:
        return
    }
  }};

  color: ${({ light }) => (light ? theme.color.primary.foreground : '#000')};

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
