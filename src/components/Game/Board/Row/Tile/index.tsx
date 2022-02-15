import { theme } from 'common/theme'
import { ReactNode } from 'react'
import styled from 'styled-components'

type TileProps = {
  children?: ReactNode
}
export function Tile({ children }: TileProps): JSX.Element {
  return <Square>{children}</Square>
}

const Square = styled.div`
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
`
