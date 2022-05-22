import {
  Challenge,
  GameOverResult,
  Attempt,
  Melody,
  NoteValue,
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
  modalIsOpen: boolean
  challenge: Challenge
  notePlaying: number | null
  playNote: (note: NoteValue) => void
}
export const GameContext = createContext({} as GameContextType)
