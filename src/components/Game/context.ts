import { Attempt, GameOverResult } from 'components/Game/types'
import { createContext } from 'react'

type GameContextType = {
  currentAttemptIndex: number
  setCurrentAttemptIndex: React.Dispatch<React.SetStateAction<number>>
  attempts: Attempt[]
  setAttempts: React.Dispatch<React.SetStateAction<Attempt[]>>
  melodyLength: number
  endGame: (result: GameOverResult) => void
  gameOverResult: GameOverResult | null
  modalIsOpen: boolean
}
export const GameContext = createContext({} as GameContextType)
