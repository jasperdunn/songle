import { GameContext } from 'components/Game/context'
import { useContext } from 'react'

export function Statistics(): JSX.Element {
  const { attempts, currentAttemptIndex } = useContext(GameContext)

  return (
    <>
      <h2>Statistics</h2>
      Completed attempt: {currentAttemptIndex + 1} / {attempts.length}
    </>
  )
}
