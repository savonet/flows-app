import { type Radio } from "@flows/lib/api/radio"

export default function Radio({ radio }: { radio: Radio }) {
  return (
    <div className='rounded shadow-lg h-48 bg-white hover:cursor-pointer border border-gray-200 hover:border-gray-300 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
      {`Radio: ${radio.name}`}
    </div>
  )
}
