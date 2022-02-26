import { Statistics } from 'components/Game/GameOverModal/Statistics'
import { GameOverResult } from 'components/Game/types'
import { Modal } from 'components/Modal'

type GameOverModalProps = {
  isOpen: boolean
  type: GameOverResult | null
  onHide: () => void
}
export function GameOverModal({
  isOpen,
  type,
  onHide,
}: GameOverModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onHide={onHide}>
      {type && <GameOverMessage type={type} />}
      <Statistics />
    </Modal>
  )
}

type GameOverMessageProps = {
  type: GameOverResult
}
function GameOverMessage({ type }: GameOverMessageProps): JSX.Element {
  if (type === 'success') {
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
