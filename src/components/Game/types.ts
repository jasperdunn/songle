export type Challenge = {
  melody: Note[]
  title: string
  artist: string
  bpm: number
}

export type Note = NaturalNote | SharpNote | FlatNote
type NaturalNote = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
type SharpNote = 'A#' | 'C#' | 'D#' | 'F#' | 'G#'
type FlatNote = 'Ab' | 'Bb' | 'Db' | 'Eb' | 'Gb'
