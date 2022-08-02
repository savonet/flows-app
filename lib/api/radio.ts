import { useApiQuery } from "."
import { useSearch } from "@flows/lib/useSearch"

export type Stream = {
  format: string
  url: string
}

export type Radio = {
  id: string
  name: string
  website: string
  description: string
  genre: string
  longitude: number
  latitude: number
  artist: string
  title: string
  streams: Stream[]
}

export type Radios = {
  total: number
  page: number
  pp: number
  data: Radio[]
}

export const useRadios = () => {
  const { bounds } = useSearch()

  const url = bounds
    ? `/radios?north=${bounds.north}&east=${bounds.east}&south=${bounds.south}&west=${bounds.west}`
    : "/radios"

  return useApiQuery<Radios>(url)
}
