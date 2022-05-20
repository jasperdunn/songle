import { GameContext } from 'components/Game/context'
import { Statistics } from 'components/Game/GameOverModal/Statistics'
import { TrackDetails } from 'components/Game/GameOverModal/TrackDetails'
import { GameOverResult } from 'components/Game/types'
import { Modal } from 'components/Modal'
import { useContext } from 'react'

type GameOverModalProps = {
  onHide: () => void
}
export function GameOverModal({ onHide }: GameOverModalProps): JSX.Element {
  const { modalIsOpen, gameOverResult } = useContext(GameContext)

  return (
    <Modal isOpen={modalIsOpen} onHide={onHide}>
      {gameOverResult && <GameOverMessage gameOverResult={gameOverResult} />}
      <Statistics />
      <TrackDetails />
    </Modal>
  )
}

type GameOverMessageProps = {
  gameOverResult: GameOverResult
}
function GameOverMessage({
  gameOverResult,
}: GameOverMessageProps): JSX.Element {
  if (gameOverResult === 'success') {
    return (
      <>
        <h1>You made it!</h1>
        <p>Congratulations!</p>
      </>
    )
  }

  return (
    <>
      <h1>Keep practicing!</h1>
      <p>Better luck next time!</p>
    </>
  )
}
