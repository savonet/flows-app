import { type Radio } from "@flows/lib/api/radio"

export default function Radio({ radio }: { radio: Radio }) {
  const displayArtist = radio.artist ? ` by ${radio.artist}` : ""
  const displayTitle = radio.title ? `${radio.title}${displayArtist}` : ""
  const logo = radio.logo || "/img/radio-logo.jpg"

  return (
    <div className='min-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex flex-col items-center pb-10'>
        <img className='mb-3 w-24 h-24 rounded-full shadow-lg' src={logo} alt={radio.name} />
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{radio.name}</h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>{displayTitle}</span>
        <div className='flex mt-4 space-x-3 md:mt-6'>
          {radio.streams.map(({ format, url }) => (
            <a
              href={url}
              key={`${format}-${url}`}
              target='_blank'
              className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              rel='noreferrer'
            >
              {format}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
