import { Container } from 'components/ErrorBoundary'
import { getLocalDateString } from 'components/Game/utils'

export function NotFound(): JSX.Element {
  return (
    <Container>
      <h2>Not found!</h2>
      <h3>This challenge doesn't exist!</h3>
      <p>
        <a href={`/${getLocalDateString(new Date())}`}>Click here</a> to go to
        todays challenge
      </p>
    </Container>
  )
}
