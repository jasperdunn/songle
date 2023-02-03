import {
  GameOverResult,
  Attempt,
  Melody,
  NoteName,
} from 'components/Game/types'
import { Game } from 'components/Game/useCurrentGame'
import { createContext } from 'react'

type GameContextType = {
  listenableAttemptIndex: number
  currentAttemptIndex: number
  attempts: Attempt[]
  melody: Melody
  endGame: (result: GameOverResult) => void
  gameOverResult: GameOverResult | null
  notePlaying: number | null
  playNote: (note: NoteName) => void
  numberOfPossibleAttempts: number
  setGame: React.Dispatch<React.SetStateAction<Game>>
}
export const GameContext = createContext({} as GameContextType)
