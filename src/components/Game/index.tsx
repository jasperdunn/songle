import { Board } from 'components/Game/Board'
import { GameContext } from 'components/Game/context'
import { GameOverModal } from 'components/Game/GameOverModal'
import { useMidiPlayer } from 'hooks/useMidiPlayer'
import { Keyboard } from 'components/Game/Keyboard'
import { GameOverResult } from 'components/Game/types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  getListenableAttemptIndex,
  getChallengeUrl,
  useCalculateCurrentAttemptIndex,
  useLoadChallenge,
  isGameLevelValid,
} from 'components/Game/utils'
import { useParams, Navigate } from 'react-router-dom'
import { useCurrentGame } from 'components/Game/useCurrentGame'
import { motion, AnimatePresence } from 'framer-motion'

export function Game({
  numberOfPossibleAttempts,
}: Pick<ValidatedGameProps, 'numberOfPossibleAttempts'>): JSX.Element | null {
  const { gameLevel } = useParams()

  if (!gameLevel || !isGameLevelValid(gameLevel)) {
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
  const [game, setGame] = useCurrentGame(
    gameLevel,
    Array(numberOfPossibleAttempts).fill([])
  )
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const listenableAttemptIndex = getListenableAttemptIndex(
    game.currentAttemptIndex,
    game.attempts
  )
  const listenableAttempt =
    listenableAttemptIndex === null ? [] : game.attempts[listenableAttemptIndex]

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
    game.attempts,
    numberOfPossibleAttempts,
    setGame
  )

  useEffect(() => {
    if (game.gameOverResult) {
      setModalIsOpen(true)
    }
  }, [game.gameOverResult])

  function endGame(gameOverResult: GameOverResult): void {
    setGame((state) => ({
      ...state,
      gameOverResult,
    }))
  }

  return (
    <GameContext.Provider
      value={{
        listenableAttemptIndex,
        currentAttemptIndex: game.currentAttemptIndex,
        setGame,
        attempts: game.attempts,
        melody,
        endGame,
        gameOverResult: game.gameOverResult,
        notePlaying,
        playNote,
        numberOfPossibleAttempts,
      }}
    >
      <AnimatePresence>
        {loadingMidi || loadingChallenge ? (
          <Container
            key="loading"
            initial="show"
            exit="hide"
            variants={{
              show: {
                opacity: 1,
              },
              hide: {
                opacity: 0,
                transition: { ease: 'easeIn', duration: 0.35 },
              },
            }}
          >
            <div style={{ marginTop: '10px' }}>loading...</div>
          </Container>
        ) : (
          <Container
            key="game"
            initial="hide"
            animate="show"
            variants={{
              show: {
                opacity: 1,
                transition: { ease: 'easeInOut', duration: 1 },
              },
              hide: {
                opacity: 0,
              },
            }}
          >
            <Board />
            <Keyboard play={play} stop={stop} playing={playing} />
            <GameOverModal
              challenge={challenge}
              onHide={() => setModalIsOpen(false)}
              isOpen={modalIsOpen}
              gameOverResult={game.gameOverResult}
            />
          </Container>
        )}
      </AnimatePresence>
    </GameContext.Provider>
  )
}

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
