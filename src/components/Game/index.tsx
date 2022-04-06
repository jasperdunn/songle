import { Board } from 'components/Game/Board'
import { GameContext } from 'components/Game/context'
import { GameOverModal } from 'components/Game/GameOverModal'
import { useMidiPlayer } from 'components/Game/useMidiPlayer'
import { Keyboard } from 'components/Game/Keyboard'
import { Player } from 'components/Game/Player'
import {
  Challenge,
  GameOverResult,
  Attempt,
  LocalStorage,
} from 'components/Game/types'
import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { getLocalStorage } from './utils'

export function Game(): JSX.Element {
  const numberOfPossibleAttempts = 6
  const challenge: Challenge = {
    artist: 'Bruno Mars',
    title: 'Uptown Funk',
    bpm: 115,
    melody: ['D', 'D', 'G', 'F', 'D', 'G', 'F', 'C', 'D'],
    midiUrl: 'https://songle.blob.core.windows.net/midi/uptown-funk.mid',
  }

  const [currentAttemptIndex, setCurrentAttemptIndex] = useState<number>(0)
  const emptyAttempts: Attempt[] = useMemo(
    () => Array.from(Array(numberOfPossibleAttempts)).map(() => []),
    [numberOfPossibleAttempts]
  )
  const [attempts, setAttempts] = useState<Attempt[]>(
    () => getLocalStorage<LocalStorage>('attempts') || emptyAttempts
  )
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [gameOverResult, setGameOverResult] = useState<GameOverResult | null>(
    null
  )
  const { loading, play, stop, playing, notePlayed } = useMidiPlayer(
    challenge.midiUrl,
    attempts,
    currentAttemptIndex
  )

  useEffect(() => {
    localStorage.setItem('attempts', JSON.stringify(attempts))
  }, [attempts])

  function endGame(result: GameOverResult): void {
    setModalIsOpen(true)
    setGameOverResult(result)
  }

  function clear(): void {
    setAttempts(emptyAttempts)
    localStorage.clear()
  }

  return (
    <GameContext.Provider
      value={{
        currentAttemptIndex,
        setCurrentAttemptIndex,
        attempts,
        setAttempts,
        melodyLength: challenge.melody.length,
        endGame,
        gameOverResult,
        modalIsOpen,
        challenge,
        notePlayed,
      }}
    >
      <Container>
        {process.env.NODE_ENV === 'development' && (
          <button onClick={clear} type="button">
            clear
          </button>
        )}
        <Player play={play} stop={stop} loading={loading} playing={playing} />
        <Board />
        <Keyboard />
        <GameOverModal onHide={() => setModalIsOpen(false)} />
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
