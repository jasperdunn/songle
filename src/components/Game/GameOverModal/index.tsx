import { Statistics } from 'components/Game/GameOverModal/Statistics'
import { TrackDetails } from 'components/Game/GameOverModal/TrackDetails'
import { GameOverResult } from 'components/Game/types'
import { Modal } from 'components/Modal'
import { Challenge } from 'components/Game/types'

type GameOverModalProps = {
  onHide: () => void
  challenge: Challenge | null
  isOpen: boolean
  gameOverResult: GameOverResult | null
}
export function GameOverModal({
  onHide,
  challenge,
  isOpen,
  gameOverResult,
}: GameOverModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onHide={onHide}>
      {gameOverResult && <GameOverMessage gameOverResult={gameOverResult} />}
      <Statistics />
      {challenge && <TrackDetails challenge={challenge} />}
    </Modal>
  )
}

type GameOverMessageProps = {
  gameOverResult: GameOverResult
}
function GameOverMessage({
  gameOverResult,
}: GameOverMessageProps): JSX.Element {
  if (gameOverResult === 'won') {
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
