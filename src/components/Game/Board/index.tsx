import { theme } from 'common/theme'
import { Row, RowProps } from 'components/Game/Board/Row'
import styled, { css } from 'styled-components'

type BoardProps = {
  numberOfNotes: RowProps['numberOfNotes']
  numberOfAttempts?: number
}
export function Board({
  numberOfNotes,
  numberOfAttempts = 6,
}: BoardProps): JSX.Element {
  const attempts = Array.from(Array(numberOfAttempts).keys())

  return (
    <GridContainer>
      <Grid numberOfAttempts={numberOfAttempts}>
        {attempts.map((a) => (
          <Row key={a} numberOfNotes={numberOfNotes} />
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
  numberOfAttempts: BoardProps['numberOfAttempts']
}
const Grid = styled.div<GridProps>`
  display: grid;
  gap: 3px;
  padding: 10px;
  width: 100vw;

  ${({ numberOfAttempts }) => css`
    grid-template-rows: repeat(${numberOfAttempts}, minmax(0, 1fr));
  `}

  @media ${theme.breakpointUp.mobileLandscape} {
    width: 500px;
    gap: 5px;
  }
`
