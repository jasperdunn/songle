import styled from 'styled-components'

type EmojiProps = {
  emoji: string
  ariaLabel: string
}
export function Emoji({ emoji, ariaLabel }: EmojiProps): JSX.Element {
  return (
    <Span role="img" aria-label={ariaLabel}>
      {emoji}
    </Span>
  )
}

const Span = styled.span`
  font-size: inherit;
`
