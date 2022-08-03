import { type Radio } from "@flows/lib/api/radio"

export default function Radio({ radio }: { radio: Radio }) {
  const displayArtist = radio.artist ? ` by ${radio.artist}` : ""
  const displayTitle = radio.title ? `${radio.title}${displayArtist}` : ""

  return (
    <div className='rounded shadow-lg h-48 bg-white border border-gray-200 hover:border-gray-300 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
      <div>{radio.name}</div>
      <div>{displayTitle}</div>
      <div>
        Listen:
        <ul>
          {radio.streams.map(({ url, format }, idx) => (
            <a className='underline' href={url} target='_blank' key={idx} rel='noreferrer'>
              {format}
            </a>
          ))}
        </ul>
      </div>
    </div>
  )
}
