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
  getLocalDateString,
} from 'components/Game/utils'
import { useLocation, useNavigate } from 'react-router-dom'

type GameProps = {
  numberOfPossibleAttempts: number
}
export function Game({ numberOfPossibleAttempts }: GameProps): JSX.Element {
  const { pathname } = useLocation()
  const gameDateString = pathname.split('/')[1]
  const navigate = useNavigate()

  if (
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(gameDateString) ===
    false
  ) {
    navigate(`/${getLocalDateString(new Date())}`, { replace: true })
  }

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
  } = useMidiPlayer(getChallengeUrl('midi', gameDateString), listenableAttempt)

  const { challenge, loadingChallenge } = useLoadChallenge(
    getChallengeUrl('json', gameDateString)
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
            {/* {process.env.NODE_ENV === 'development' && ( */}
            <button onClick={resetGame} type="button">
              RESET GAME
            </button>
            {/* )} */}
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
