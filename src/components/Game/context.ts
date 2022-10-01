import {
  GameOverResult,
  Attempt,
  Melody,
  NoteName,
} from 'components/Game/types'
import { createContext } from 'react'

type GameContextType = {
  listenableAttemptIndex: number
  currentAttemptIndex: number
  setCurrentAttemptIndex: React.Dispatch<React.SetStateAction<number>>
  attempts: Attempt[]
  setAttempts: React.Dispatch<React.SetStateAction<Attempt[]>>
  melody: Melody
  endGame: (result: GameOverResult) => void
  gameOverResult: GameOverResult | null
  notePlaying: number | null
  playNote: (note: NoteName) => void
  numberOfPossibleAttempts: number
}
export const GameContext = createContext({} as GameContextType)
