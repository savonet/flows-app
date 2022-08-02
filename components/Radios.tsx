import { useRadios } from "@flows/lib/api/radio"
import Radio from "./Radio"

export default function Radios() {
  const radiosQuery = useRadios()

  if (radiosQuery.status !== "loaded") return <p>Loading..</p>

  const { data: radios } = radiosQuery.data

  return (
    <div className='grid grid-cols-4 gap-4 py-4 px-6'>
      {radios.map((radio, idx) => (
        <Radio radio={radio} key={idx} />
      ))}
    </div>
  )
}
