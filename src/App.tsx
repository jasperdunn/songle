import { normalizedStyles, globalStyles } from 'common/styles'
import styled, { createGlobalStyle } from 'styled-components'
import { theme } from 'common/theme'
import { Game } from 'components/Game'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { NotFound } from 'components/NotFound'
import { FiHelpCircle, FiGrid } from 'react-icons/fi'
import { Button } from 'components/Button'
import { useLocalStorage } from 'common/storage'
import { OnboardingModal } from 'components/OnboardingModal'
import { Challenges } from 'components/Challenges'

const GlobalStyle = createGlobalStyle`
${normalizedStyles}
${globalStyles}
`

export function App(): JSX.Element {
  const [onBoarded, setOnBoarded] = useLocalStorage('onBoarded', false)
  const navigate = useNavigate()
  const numberOfPossibleAttempts = 6

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header>
          <Button
            style={{ position: 'absolute', left: 0, top: 0 }}
            onClick={() => navigate('/challenges')}
            variant="primary"
            light
          >
            <FiGrid size={28} />
          </Button>
          <Title>songle</Title>
          <Button
            style={{ position: 'absolute', right: 0, top: 0 }}
            onClick={() => setOnBoarded(false)}
            variant="primary"
            light
          >
            <FiHelpCircle size={28} />
          </Button>
        </Header>
        <Main>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Challenges />} />
              <Route path="challenges" element={<Challenges />} />
              <Route
                path=":gameLevel"
                element={
                  <Game numberOfPossibleAttempts={numberOfPossibleAttempts} />
                }
              />
              <Route path="not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </Main>
        <OnboardingModal
          numberOfPossibleAttempts={numberOfPossibleAttempts}
          onBoarded={onBoarded}
          setOnBoarded={setOnBoarded}
        />
      </Layout>
    </>
  )
}

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'main';
  grid-template-rows: 50px 1fr;
  min-width: 100vw;
  min-height: 100vh;

  @media ${theme.breakpointUp.mobileLandscape} {
    grid-template-rows: 72px 1fr;
  }
`

const Header = styled.div`
  grid-area: header;
  background-color: ${theme.color.primary.background};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  color: ${theme.color.primary.foreground};
  margin: 0;
  text-align: center;
  font-size: ${theme.fontSize.large};

  @media ${theme.breakpointUp.mobileLandscape} {
    font-size: ${theme.fontSize.extraLarge};
  }
`

const Main = styled.div`
  grid-area: main;
  background-color: ${theme.color.secondary.background};
`
