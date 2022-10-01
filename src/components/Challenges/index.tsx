import { theme } from 'common/theme'
import styled from 'styled-components'

export function Challenges(): JSX.Element {
  const challenges = ['000', '001', '002', '003', '004', '005', '006']

  return (
    <Grid>
      {challenges.map((gameLevel) => (
        <GameLevel key={gameLevel} gameLevel={gameLevel} />
      ))}
    </Grid>
  )
}

type GameLevelProps = {
  gameLevel: string
}
function GameLevel({ gameLevel }: GameLevelProps): JSX.Element {
  return <GameLevelNumber href={gameLevel}>{gameLevel}</GameLevelNumber>
}

const Grid = styled.div`
  margin: auto;
  display: grid;
  padding: 8px;
  gap: 8px;
  grid-template-columns: repeat(5, 1fr);

  @media ${theme.breakpointUp.mobileLandscape} {
    width: 500px;
    gap: 16px;
    padding: 16px;
  }

  @media ${theme.breakpointUp.tablet} {
    width: 700px;
    gap: 24px;
    padding: 24px;
  }
`

const GameLevelNumber = styled.a`
  border: 2px solid gray;
  background-color: ${theme.color.primary.background};
  filter: brightness(0.8);
  font-size: ${theme.fontSize.large};
  font-weight: bold;
  color: white;
  text-decoration: none;
  user-select: none;
  line-height: 1;
  justify-content: center;
  align-items: center;
  display: inline-flex;

  :before {
    content: '';
    display: inline-block;
    padding-top: 100%;
  }

  @media ${theme.breakpointUp.mobileLandscape} {
    font-size: 24px;
  }
`
