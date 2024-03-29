import { theme } from 'common/theme'
import { Tile } from 'components/Game/Board/Row/Tile'
import { GameContext } from 'components/Game/context'
import { Attempt } from 'components/Game/types'
import { useContext } from 'react'
import styled, { css } from 'styled-components'

type RowProps = {
  attempt: Attempt
  listenable: boolean
  noAttemptsYet: boolean
}
export function Row({
  attempt,
  listenable,
  noAttemptsYet,
}: RowProps): JSX.Element {
  const { melody, notePlaying } = useContext(GameContext)
  const availableTiles = Array.from(Array(melody.length).keys())

  return (
    <RowGrid melodyLength={melody.length}>
      {availableTiles.map((n) => {
        const note = attempt[n]

        if (noAttemptsYet && !note) {
          return <Tile key={n} playing={notePlaying === n}></Tile>
        }

        if (!note) {
          return <Tile key={n}></Tile>
        }

        return (
          <Tile
            key={n}
            hint={note.hint}
            playing={listenable && notePlaying === n}
          >
            {note.name}
          </Tile>
        )
      })}
    </RowGrid>
  )
}

type RowGridProps = {
  melodyLength: number
}
export const RowGrid = styled.div<RowGridProps>`
  display: grid;
  gap: 3px;

  ${({ melodyLength }) => css`
    grid-template-columns: repeat(${melodyLength}, minmax(0, 1fr));
  `}

  @media ${theme.breakpointUp.mobileLandscape} {
    gap: 5px;
  }
`
