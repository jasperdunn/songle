import { Container } from 'components/ErrorBoundary'

export function NotFound(): JSX.Element {
  return (
    <Container>
      <h2>Not found!</h2>
      <h3>This challenge doesn't exist!</h3>
      <p>
        <a href={`/challenges`}>Click here</a> to view the challenges.
      </p>
    </Container>
  )
}
