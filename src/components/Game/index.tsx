import { Board } from 'components/Game/Board'
import { GameContext } from 'components/Game/context'
import { GameOverModal } from 'components/Game/GameOverModal'
import { useMidiPlayer } from 'hooks/useMidiPlayer'
import { Keyboard } from 'components/Game/Keyboard'
import { Attempt, Challenge, GameOverResult } from 'components/Game/types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getLocalStorage, useLocalStorage } from 'common/storage'
import { useCalculateCurrentAttemptIndex } from 'components/Game/utils'

export function Game(): JSX.Element {
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

  const numberOfPossibleAttempts = 6
  const [attempts, setAttempts] = useState<Attempt[]>(() =>
    Array(numberOfPossibleAttempts).fill([])
  )
  const [gameOverResult, setGameOverResult] = useLocalStorage(
    'gameOverResult',
    null
  )
  const [currentAttemptIndex, setCurrentAttemptIndex] = useLocalStorage(
    'currentAttemptIndex',
    0
  )

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { loading, play, stop, playing, notePlayed, melody } = useMidiPlayer(
    challenge.midiUrl,
    attempts,
    currentAttemptIndex,
    gameOverResult
  )

  useCalculateCurrentAttemptIndex(
    melody.length,
    attempts,
    numberOfPossibleAttempts,
    setCurrentAttemptIndex
  )

  useEffect(() => {
    const storedAttempts = getLocalStorage('attempts')
    if (storedAttempts) {
      setAttempts(storedAttempts)
    }
  }, [])

  useEffect(() => {
    if (gameOverResult) {
      setModalIsOpen(true)
    }
  }, [gameOverResult])

  function endGame(result: GameOverResult): void {
    setGameOverResult(result)
  }

  function resetGame(): void {
    localStorage.clear()
    window.location.reload()
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
