import { useCallback, useState, useMemo, createContext, useContext, useRef, ReactNode } from "react"
import { type Stream } from "@flows/lib/utils"

export type AudioContextType = {
  playing: Stream | undefined
  paused: boolean
  position: number
  play: (_: Stream) => void
  pause: () => void
  toggle: () => void
}

const AudioContext = createContext<AudioContextType>({} as unknown as AudioContextType)

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [position, setPosition] = useState(0)
  const [paused, setPaused] = useState(false)
  const [playing, setPlaying] = useState<Stream | undefined>()

  const play = useCallback(
    (stream: Stream) => {
      if (!audioRef.current) return

      audioRef.current.src = stream.url
      audioRef.current.play()

      setPlaying(stream)
      setPaused(false)
    },
    [setPlaying, setPaused, audioRef]
  )

  const pause = useCallback(() => {
    if (!audioRef.current) return

    audioRef.current.pause()
    setPaused(true)
  }, [audioRef, setPaused])

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (!playing) return

    if (paused) {
      setPaused(false)
      audioRef.current.play()
      return
    }

    setPaused(true)
    audioRef.current.pause()
  }, [playing, paused, setPaused])

  const onTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement>) => {
      e.preventDefault()

      setPosition(e.currentTarget.currentTime)
    },
    [setPosition]
  )

  const value = useMemo(
    () => ({
      play,
      pause,
      paused,
      toggle,
      playing,
      position,
    }),
    [play, pause, paused, toggle, playing, position]
  )

  return (
    <>
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} />
      <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
    </>
  )
}

export const useAudioContext = () => useContext(AudioContext)
