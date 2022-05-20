import { Board } from 'components/Game/Board'
import { GameContext } from 'components/Game/context'
import { GameOverModal } from 'components/Game/GameOverModal'
import { useMidiPlayer } from 'components/Game/useMidiPlayer'
import { Keyboard } from 'components/Game/Keyboard'
import { Attempt, Challenge, GameOverResult } from 'components/Game/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getLocalStorage, setLocalStorage } from 'common/storage'
import { getCurrentAttemptIndex } from 'components/Game/utils'

export function Game(): JSX.Element {
  const numberOfPossibleAttempts = 6
  const challenge: Challenge = {
    artist: 'Mark Ronson',
    title: 'Uptown Funk (feat. Bruno Mars)',
    spotifyUrl:
      'https://open.spotify.com/embed/track/32OlwWuMpZ6b0aN2RZOeMS?utm_source=generator',
    youtubeUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0',
    appleMusicUrl:
      'https://embed.music.apple.com/au/album/uptown-funk-feat-bruno-mars/943946661?i=943946671',
    midiUrl: 'https://songle.blob.core.windows.net/midi/uptown-funk.mid',
  }

  const emptyAttempts: Attempt[] = useMemo(
    // Array.fill ?
    () => Array.from(Array(numberOfPossibleAttempts)).map(() => []),
    [numberOfPossibleAttempts]
  )
  const [attempts, setAttempts] = useState<Attempt[]>(
    () => getLocalStorage('attempts') || emptyAttempts
  )
  const [currentAttemptIndex, setCurrentAttemptIndex] = useState<number>(0)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [gameOverResult, setGameOverResult] = useState<GameOverResult | null>(
    null
  )

  const { loading, play, stop, playing, notePlayed, melody } = useMidiPlayer({
    srcUrl: challenge.midiUrl,
    attempts,
    currentAttemptIndex,
  })
  const updateCurrentAttemptIndex = useCallback(() => {
    if (melody.length) {
      setCurrentAttemptIndex(
        getCurrentAttemptIndex(
          attempts,
          melody.length,
          numberOfPossibleAttempts
        )
      )
    }
  }, [attempts, melody.length])

  useEffect(() => {
    setLocalStorage('attempts', attempts)
  }, [attempts])

  useEffect(() => {
    updateCurrentAttemptIndex()
  }, [updateCurrentAttemptIndex])

  function endGame(result: GameOverResult): void {
    setModalIsOpen(true)
    setGameOverResult(result)
  }

  function resetGame(): void {
    setAttempts(emptyAttempts)
    setCurrentAttemptIndex(0)
    localStorage.clear()
  }

  return (
    <GameContext.Provider
      value={{
        currentAttemptIndex,
        setCurrentAttemptIndex,
        attempts,
        setAttempts,
        melody,
        endGame,
        gameOverResult,
        modalIsOpen,
        challenge,
        notePlayed,
      }}
    >
      <Container>
        {process.env.NODE_ENV === 'development' && (
          <button onClick={resetGame} type="button">
            RESET GAME
          </button>
        )}
        <Board />
        <Keyboard play={play} stop={stop} loading={loading} playing={playing} />
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
