import { Note } from 'components/Game/types'
import { createContext } from 'react'

type GameContextType = {
  currentAttemptIndex: number
  setCurrentAttemptIndex: React.Dispatch<React.SetStateAction<number>>
  attempts: Note[][]
  setAttempts: React.Dispatch<React.SetStateAction<Note[][]>>
  melodyLength: number
  numberOfPossibleAttempts: number
}
export const GameContext = createContext({} as GameContextType)
