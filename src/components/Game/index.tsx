import { Board } from 'components/Game/Board'
import { GameContext } from 'components/Game/context'
import { GameOverModal } from 'components/Game/GameOverModal'
import { useMidiPlayer } from 'components/Game/useMidiPlayer'
import { Keyboard } from 'components/Game/Keyboard'
import { Note, Challenge, GameOverResult } from 'components/Game/types'
import { useState } from 'react'
import styled from 'styled-components'

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

  const [currentAttemptIndex, setCurrentAttemptIndex] = useState<number>(0)
  const [attempts, setAttempts] = useState<Note[][]>(() =>
    Array.from(Array(numberOfPossibleAttempts)).map(() => [])
  )
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [gameOverResult, setGameOverResult] = useState<GameOverResult | null>(
    null
  )
  const { loading, play, stop, playing, notePlayed, melody } = useMidiPlayer(
    challenge.midiUrl,
    attempts,
    currentAttemptIndex
  )

  function endGame(result: GameOverResult): void {
    setModalIsOpen(true)
    setGameOverResult(result)
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
