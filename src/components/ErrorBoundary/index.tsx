import { Component, ErrorInfo, ReactNode } from 'react'
import { theme } from 'common/theme'
import styled from 'styled-components'
import { Emoji } from 'components/Emoji'

type ErrorBoundaryProps = {
  children: ReactNode
}
type ErrorBoundaryState = {
  errorOccurred: boolean
}
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    errorOccurred: false,
  }

  static getDerivedStateFromError(): { errorOccurred: boolean } {
    return { errorOccurred: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo.componentStack)
  }

  render(): ReactNode {
    if (this.state.errorOccurred) {
      return (
        <Container>
          <h2>Whoops!</h2>
          <h3>That doesn't sound very good!</h3>
          <p>Something went wrong, and we are looking into it.</p>
          <p>
            We love you!! <Emoji ariaLabel="sparkling heart" emoji="💖" />
          </p>
        </Container>
      )
    }

    return this.props.children
  }
}

const Container = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  width: 300px;

  @media ${theme.breakpointUp.mobileLandscape} {
    margin: auto;
    color: 'red';
  }
`
