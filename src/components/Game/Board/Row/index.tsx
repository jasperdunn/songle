import { theme } from 'common/theme'
import { Tile } from 'components/Game/Board/Row/Tile'
import styled, { css } from 'styled-components'

export type RowProps = {
  numberOfNotes: number
}
export function Row({ numberOfNotes }: RowProps): JSX.Element {
  const notes = Array.from(Array(numberOfNotes).keys())

  return (
    <Grid numberOfNotes={numberOfNotes}>
      {notes.map((n) => (
        <Tile key={n}></Tile>
      ))}
    </Grid>
  )
}

type GridProps = {
  numberOfNotes: RowProps['numberOfNotes']
}
const Grid = styled.div<GridProps>`
  display: grid;
  gap: 3px;

  ${({ numberOfNotes }) => css`
    grid-template-columns: repeat(${numberOfNotes}, minmax(0, 1fr));
  `}

  @media ${theme.breakpointUp.mobileLandscape} {
    gap: 5px;
  }
`
