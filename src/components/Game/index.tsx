import { Board } from 'components/Game/Board'
import { GameContext } from 'components/Game/context'
import { GameOverModal } from 'components/Game/GameOverModal'
import { useMidiPlayer } from 'hooks/useMidiPlayer'
import { Keyboard } from 'components/Game/Keyboard'
import { Attempt, GameOverResult } from 'components/Game/types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getLocalStorage, useLocalStorage } from 'common/storage'
import {
  getListenableAttemptIndex,
  getChallengeUrl,
  useCalculateCurrentAttemptIndex,
  useLoadChallenge,
} from 'components/Game/utils'
import { useParams, Navigate } from 'react-router-dom'

export function Game({
  numberOfPossibleAttempts,
}: Pick<ValidatedGameProps, 'numberOfPossibleAttempts'>): JSX.Element | null {
  const { gameLevel } = useParams()

  if (gameLevel === undefined || /^\d{3}$/.test(gameLevel) === false) {
    return <Navigate replace to="/not-found" />
  }

  return (
    <ValidatedGame
      numberOfPossibleAttempts={numberOfPossibleAttempts}
      gameLevel={gameLevel}
    />
  )
}

type ValidatedGameProps = {
  numberOfPossibleAttempts: number
  gameLevel: string
}
function ValidatedGame({
  numberOfPossibleAttempts,
  gameLevel,
}: ValidatedGameProps): JSX.Element {
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

  const listenableAttemptIndex = getListenableAttemptIndex(
    currentAttemptIndex,
    attempts
  )
  const listenableAttempt = attempts[listenableAttemptIndex]
  const {
    loading: loadingMidi,
    play,
    stop,
    playing,
    notePlaying,
    melody,
    playNote,
  } = useMidiPlayer(getChallengeUrl('midi', gameLevel), listenableAttempt)

  const { challenge, loadingChallenge } = useLoadChallenge(
    getChallengeUrl('json', gameLevel)
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
        listenableAttemptIndex,
        currentAttemptIndex,
        setCurrentAttemptIndex,
        attempts,
        setAttempts,
        melody,
        endGame,
        gameOverResult,
        notePlaying,
        playNote,
        numberOfPossibleAttempts,
      }}
    >
      <Container>
        {loadingMidi || loadingChallenge ? (
          'loading...'
        ) : (
          <>
            {process.env.NODE_ENV === 'development' && (
              <button onClick={resetGame} type="button">
                RESET GAME
              </button>
            )}
            <Board />
            <Keyboard play={play} stop={stop} playing={playing} />
            <GameOverModal
              challenge={challenge}
              onHide={() => setModalIsOpen(false)}
              isOpen={modalIsOpen}
              gameOverResult={gameOverResult}
            />
          </>
        )}
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
