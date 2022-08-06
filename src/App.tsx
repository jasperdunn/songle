import { normalizedStyles, globalStyles } from 'common/styles'
import styled, { createGlobalStyle } from 'styled-components'
import { theme } from 'common/theme'
import { Game } from 'components/Game'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { NotFound } from 'components/NotFound'
import { useEffect } from 'react'
import { getLocalDateString } from 'components/Game/utils'
import { FiHelpCircle } from 'react-icons/fi'
import { Button } from 'components/Button'
import { useLocalStorage } from 'common/storage'
import { OnboardingModal } from 'components/OnboardingModal'

const GlobalStyle = createGlobalStyle`
${normalizedStyles}
${globalStyles}
`

export function App(): JSX.Element {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [onBoarded, setOnBoarded] = useLocalStorage('onBoarded', false)

  useEffect(() => {
    if (pathname === '/') {
      navigate(getLocalDateString(new Date()), { replace: true })
    }
  }, [navigate, pathname])

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header>
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
              <Route path=":gameDateString" element={<Game />} />
              <Route path="not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </Main>
        <OnboardingModal onBoarded={onBoarded} setOnBoarded={setOnBoarded} />
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
