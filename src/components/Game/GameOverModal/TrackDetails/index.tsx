import { GameContext } from 'components/Game/context'
import { useContext } from 'react'
import styled from 'styled-components'

export function TrackDetails(): JSX.Element {
  const { challenge } = useContext(GameContext)

  return (
    <div
      style={{
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '3px solid lightgrey',
      }}
    >
      <h2>{challenge.title}</h2>
      <h3>{challenge.artist}</h3>
      <AppleMusicPlayer
        title="Apple music player"
        src={challenge.appleMusicUrl}
        allow="encrypted-media"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      />
      <YouTubeVideoPlayer
        title="YouTube video player"
        src={challenge.youtubeUrl}
        allow="encrypted-media"
        allowFullScreen
      />
      <SpotifyMusicPlayer
        title="Spotify music player"
        src={challenge.spotifyUrl}
        allow="encrypted-media"
      />
    </div>
  )
}

const AppleMusicPlayer = styled.iframe`
  height: 186px;
  width: 100%;
  background: transparent;
  border: 0;
`

const YouTubeVideoPlayer = styled.iframe`
  width: 100%;
  border-radius: 10px;
  border: 0;
  margin-bottom: 12px;
`

const SpotifyMusicPlayer = styled.iframe`
  height: 80px;
  width: 100%;
  border-radius: 10px;
  border: 0;
`
