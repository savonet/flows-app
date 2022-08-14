import { type Radio, type Stream } from "@flows/lib/utils"
import { useCallback } from "react"
import { useAudioContext } from "@flows/lib/useAudioContext"

const grids: { [_: number]: string } = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
}

const playIcon = (
  <svg
    className='h-5 w-5 fill-neutral-900 group-hover:fill-neutral-500 stroke-neutral-900 group-hover:stroke-neutral-500'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
  >
    <polygon points='5 3 19 12 5 21 5 3' />
  </svg>
)

const pauseIcon = (
  <svg
    className='h-5 w-5 fill-neutral-900 group-hover:fill-neutral-500 stroke-neutral-900 group-hover:stroke-neutral-500'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='6' y1='19' x2='6' y2='5' />
    <line x1='17' y1='5' x2='17' y2='19' />
  </svg>
)

const Stream = ({ stream }: { stream: Stream }) => {
  const { paused, play, playing, toggle } = useAudioContext()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()

      if (playing?.id === stream.id) return toggle()

      play(stream)
    },
    [play, playing, stream, toggle]
  )

  return (
    <div className='flex flex-col items-center pb-4'>
      <button
        className='flex items-center justify-center group rounded-full w-8 h-8 ring-2 ring-gray-100'
        onClick={onClick}
      >
        {playing?.id === stream.id && !paused ? pauseIcon : playIcon}
      </button>
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
            <Stream stream={stream} key={stream.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
