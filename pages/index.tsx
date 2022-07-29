import { useRadios } from "@flows/lib/api/radio"

export default function Home() {
  const radiosQuery = useRadios()

  if (radiosQuery.status !== "loaded") return <p>Loading..</p>

  const { data: radios } = radiosQuery

  const display = radios.map(({ name, id }) => `${name} (${id})`)

  return <p>{`Radios: ${display}`}</p>
}
