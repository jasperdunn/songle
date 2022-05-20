import { theme } from 'common/theme'
import { Tile } from 'components/Game/Board/Row/Tile'
import { GameContext } from 'components/Game/context'
import { Attempt } from 'components/Game/types'
import { useContext } from 'react'
import styled, { css } from 'styled-components'

type RowProps = {
  attempt: Attempt
  isPreviousAttempt: boolean
}
export function Row({ attempt, isPreviousAttempt }: RowProps): JSX.Element {
  const { melody, notePlayed } = useContext(GameContext)
  const availableTiles = Array.from(Array(melody.length).keys())

  return (
    <Grid melodyLength={melody.length}>
      {availableTiles.map((n) => {
        if (!attempt[n]) {
          return (
            <Tile key={n} played={isPreviousAttempt && notePlayed === n}></Tile>
          )
        }

        const note = attempt[n]
        return (
          <Tile
            key={n}
            hint={note.hint}
            played={isPreviousAttempt && notePlayed === n}
          >
            {note.value}
          </Tile>
        )
      })}
    </Grid>
  )
}

type GridProps = {
  melodyLength: number
}
const Grid = styled.div<GridProps>`
  display: grid;
  gap: 3px;

  ${({ melodyLength }) => css`
    grid-template-columns: repeat(${melodyLength}, minmax(0, 1fr));
  `}

  @media ${theme.breakpointUp.mobileLandscape} {
    gap: 5px;
  }
`
