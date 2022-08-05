import { type Radio, type Stream } from "@flows/lib/utils"
import { useEffect, useRef } from "react"
import { useSearch } from "@flows/lib/useSearch"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

const grids: { [_: number]: string } = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
}

export const createSyntheticEvent = <T extends Element, E extends Event>(event: E): React.SyntheticEvent<T, E> => {
  let isDefaultPrevented = false
  let isPropagationStopped = false
  const preventDefault = () => {
    isDefaultPrevented = true
    event.preventDefault()
  }
  const stopPropagation = () => {
    isPropagationStopped = true
    event.stopPropagation()
  }
  return {
    nativeEvent: event,
    currentTarget: event.currentTarget as EventTarget & T,
    target: event.target as EventTarget & T,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    preventDefault,
    isDefaultPrevented: () => isDefaultPrevented,
    stopPropagation,
    isPropagationStopped: () => isPropagationStopped,
    persist: () => undefined,
    timeStamp: event.timeStamp,
    type: event.type,
  }
}

const Stream = ({ radio, stream }: { radio: Radio; stream: Stream }) => {
  const player = useRef<AudioPlayer>(null)
  const { isPlaying, setIsPlaying } = useSearch()

  useEffect(() => {
    if (!player.current) return
    if (isPlaying && stream.id === isPlaying.stream.id) return

    if (player.current.isPlaying()) {
      // 💩
      const event = new Event("change", { bubbles: true })
      Object.defineProperty(event, "target", { writable: false, value: player.current.audio.current })
      const syntheticEvent = createSyntheticEvent(event) as React.ChangeEvent<typeof player.current.audio.current>
      player.current.togglePlay(syntheticEvent)
    }
  }, [player, isPlaying, stream])

  return (
    <div className='flex flex-col items-center pb-4'>
      <AudioPlayer
        src={stream.url}
        preload='none'
        ref={player}
        onPlay={() => setIsPlaying({ stream, radio })}
        crossOrigin='anonymous'
        showJumpControls={false}
        showDownloadProgress={false}
        showFilledProgress={false}
        hasDefaultKeyBindings={false}
        customProgressBarSection={[]}
        customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        style={{ padding: "none", boxShadow: "none" }}
      />
      <a
        href={stream.url}
        target='_blank'
        className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-600 bg-slate-200 uppercase last:mr-0 mr-1'
        rel='noreferrer'
      >
        {stream.format}
      </a>
    </div>
  )
}

export default function Radio({ radio }: { radio: Radio }) {
  const displayArtist = radio.artist ? ` by ${radio.artist}` : ""
  const displayTitle = radio.title ? `${radio.title}${displayArtist}` : ""
  const logo = radio.logo || "/img/radio-logo.jpg"

  return (
    <div className='min-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex flex-col items-center pb-4'>
        <img className='mb-3 mt-3 w-24 h-24 rounded-full shadow-lg' src={logo} alt={radio.name} />
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{radio.name}</h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>{displayTitle}</span>
        <div
          className={`grid ${
            grids[radio.streams.length] || "grid-cols-4"
          } justify-items-center space-x-0.5 gap-4 py-4 px-6`}
        >
          {radio.streams.map(stream => (
            <Stream radio={radio} stream={stream} key={stream.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
