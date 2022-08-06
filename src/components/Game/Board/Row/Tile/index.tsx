import { theme } from 'common/theme'
import { NoteHint } from 'components/Game/types'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

type TileProps = {
  children?: ReactNode
  hint?: NoteHint
  playing?: boolean
}
export function Tile({ children, hint, playing }: TileProps): JSX.Element {
  return (
    <Square $hint={hint} playing={playing}>
      {children}
    </Square>
  )
}

type SquareProps = {
  $hint: TileProps['hint']
  playing: TileProps['playing']
}
const Square = styled.div<SquareProps>`
  border: 2px solid gray;
  user-select: none;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  :before {
    content: '';
    display: inline-block;
    padding-top: 100%;
  }

  @media ${theme.breakpointUp.mobileLandscape} {
    font-size: 24px;
  }

  ${({ playing }) =>
    playing &&
    css`
      border-style: dashed;
    `}

  ${({ $hint }) => {
    switch ($hint) {
      case 0:
        return css`
          background-color: ${theme.color.primary.background};
          filter: brightness(0.8);
        `

      case 1:
        return css`
          background-color: rgb(74, 74, 255);
        `

      case 2:
        return css`
          background-color: #ff8c00;
        `

      default:
        return
    }
  }}
`
