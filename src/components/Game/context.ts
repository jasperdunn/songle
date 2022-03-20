import { Note, Challenge, GameOverResult } from 'components/Game/types'
import { createContext } from 'react'

type GameContextType = {
  currentAttemptIndex: number
  setCurrentAttemptIndex: React.Dispatch<React.SetStateAction<number>>
  attempts: Note[][]
  setAttempts: React.Dispatch<React.SetStateAction<Note[][]>>
  melodyLength: number
  endGame: (result: GameOverResult) => void
  gameOverResult: GameOverResult | null
  modalIsOpen: boolean
  challenge: Challenge
  notePlayed: number | null
}
export const GameContext = createContext({} as GameContextType)
