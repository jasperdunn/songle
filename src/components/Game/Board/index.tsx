import { theme } from 'common/theme'
import { Row } from 'components/Game/Board/Row'
import { GameContext } from 'components/Game/context'
import { useContext } from 'react'
import styled, { css } from 'styled-components'

export function Board(): JSX.Element {
  const { attempts, numberOfPossibleAttempts } = useContext(GameContext)
  const possibleAttempts = Array.from(Array(numberOfPossibleAttempts).keys())

  return (
    <GridContainer>
      <Grid numberOfPossibleAttempts={numberOfPossibleAttempts}>
        {possibleAttempts.map((a) => (
          <Row key={a} attempt={attempts[a]} />
        ))}
      </Grid>
    </GridContainer>
  )
}

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

type GridProps = {
  numberOfPossibleAttempts: number
}
const Grid = styled.div<GridProps>`
  display: grid;
  gap: 3px;
  padding: 10px;
  width: 100vw;

  ${({ numberOfPossibleAttempts }) => css`
    grid-template-rows: repeat(${numberOfPossibleAttempts}, minmax(0, 1fr));
  `}

  @media ${theme.breakpointUp.mobileLandscape} {
    width: 500px;
    gap: 5px;
  }
`
