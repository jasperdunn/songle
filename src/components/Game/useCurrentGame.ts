import { Attempt, GameOverResult } from 'components/Game/types'
import { useLocalStorage } from 'hooks/useStorage'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

export function useCurrentGame(
  gameLevel: string,
  initialAttempts: Attempt[]
): [Game, Dispatch<SetStateAction<Game>>] {
  const initialGame: Game = {
    attempts: initialAttempts,
    currentAttemptIndex: 0,
    gameOverResult: null,
    gameLevel,
  }
  const [gameByLevel, setGameByLevel] = useLocalStorage('gameByLevel', {})
  const [currentGame, setCurrentGame] = useState(
    gameByLevel[gameLevel] || initialGame
  )

  useEffect(() => {
    setGameByLevel((state) => ({
      ...state,
      [gameLevel]: currentGame,
    }))
  }, [currentGame, gameLevel, setGameByLevel])

  return [currentGame, setCurrentGame]
}

export type Game = {
  gameLevel: string
  attempts: Attempt[]
  currentAttemptIndex: number
  gameOverResult: GameOverResult | null
}
