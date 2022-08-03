import { useRadios } from "@flows/lib/api/radio"
import Radio from "./Radio"

export default function Radios() {
  const radiosQuery = useRadios()

  if (radiosQuery.status !== "loaded") return <p>Loading..</p>

  const { data: radios } = radiosQuery.data

  const colCount = radios.length <= 4 ? `grid-cols-${radios.length}` : "grid-cols-4"

  return (
    <div className={`grid ${colCount} gap-4 py-4 px-6`}>
      {radios.map((radio, idx) => (
        <Radio radio={radio} key={idx} />
      ))}
    </div>
  )
}
