import {
  Challenge,
  GameOverResult,
  NoteValue,
  Attempt,
} from 'components/Game/types'
import { createContext } from 'react'

type GameContextType = {
  currentAttemptIndex: number
  setCurrentAttemptIndex: React.Dispatch<React.SetStateAction<number>>
  attempts: Attempt[]
  setAttempts: React.Dispatch<React.SetStateAction<Attempt[]>>
  melody: NoteValue[]
  endGame: (result: GameOverResult) => void
  gameOverResult: GameOverResult | null
  modalIsOpen: boolean
  challenge: Challenge
  notePlayed: number | null
}
export const GameContext = createContext({} as GameContextType)
