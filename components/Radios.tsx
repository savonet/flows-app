import { useRadios } from "@flows/lib/api/radio"
import Radio from "./Radio"

const grids: { [_: number]: string } = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
}

export default function Radios() {
  const radiosQuery = useRadios()

  if (radiosQuery.status !== "loaded") return <p>Loading..</p>

  const { data: radios } = radiosQuery.data

  return (
    <div className={`grid ${grids[radios.length] || "grid-cols-4"} justify-items-center space-x-0.5 gap-4 py-4 px-6`}>
      {radios.map(radio => (
        <Radio radio={radio} key={radio.name} />
      ))}
    </div>
  )
}
