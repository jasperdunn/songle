import { normalizedStyles, globalStyles } from 'common/styles'
import styled, { createGlobalStyle } from 'styled-components'
import { theme } from 'common/theme'
import { Game } from 'components/Game'

const GlobalStyle = createGlobalStyle`
${normalizedStyles}
${globalStyles}
`

export function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header>
          <Title>songle</Title>
        </Header>
        <Main>
          <Game />
        </Main>
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
