import { GameContext } from 'components/Game/context'
import { useContext } from 'react'

export function Statistics(): JSX.Element {
  const { attempts, listenableAttemptIndex } = useContext(GameContext)

  return (
    <>
      <h2>Statistics</h2>
      Completed attempt: {listenableAttemptIndex} / {attempts.length}
    </>
  )
}
