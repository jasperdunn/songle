import { Attempt, GameOverResult } from 'components/Game/types'
import { useLocalStorage } from 'hooks/useStorage'
import { Dispatch, SetStateAction } from 'react'

export function useCurrentGame(
  gameLevel: string,
  initialAttempts: Attempt[]
): [Game, Dispatch<SetStateAction<Game>>] {
  const [gameByLevel, setGameByLevel] = useLocalStorage('gameByLevel', {})

  const initialGame: Game = {
    attempts: initialAttempts,
    currentAttemptIndex: 0,
    gameOverResult: null,
    gameLevel,
  }
  const game: Game = gameByLevel[gameLevel] || initialGame

  const setGame: Dispatch<SetStateAction<Game>> = (
    action: Game | ((prevState: Game) => Game)
  ) => {
    setGameByLevel((state) => ({
      ...state,
      [gameLevel]: typeof action === 'function' ? action(game) : action,
    }))
  }

  return [game, setGame]
}

export type Game = {
  gameLevel: string
  attempts: Attempt[]
  currentAttemptIndex: number
  gameOverResult: GameOverResult | null
}
