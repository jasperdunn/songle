import { Board } from 'components/Game/Board'
import { GameContext } from 'components/Game/context'
import { Keyboard } from 'components/Game/Keyboard'
import { sampleData } from 'components/Game/sampleData'
import { Attempt } from 'components/Game/types'
import { useState } from 'react'
import styled from 'styled-components'

export function Game(): JSX.Element {
  const numberOfPossibleAttempts = 6

  const [currentAttemptIndex, setCurrentAttemptIndex] = useState<number>(0)
  const [attempts, setAttempts] = useState<Attempt[]>(() =>
    Array.from(Array(numberOfPossibleAttempts)).map(() => [])
  )

  return (
    <GameContext.Provider
      value={{
        currentAttemptIndex,
        setCurrentAttemptIndex,
        attempts,
        setAttempts,
        melodyLength: sampleData.melody.length,
      }}
    >
      <Container>
        <Board />
        <Keyboard />
      </Container>
    </GameContext.Provider>
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
