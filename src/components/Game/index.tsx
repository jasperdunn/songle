import { Board } from 'components/Game/Board'
import { Keyboard } from 'components/Game/Keyboard'
import styled from 'styled-components'

export function Game(): JSX.Element {
  return (
    <Container>
      <Board numberOfNotes={9} />
      <Keyboard />
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
