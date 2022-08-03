import { useApiQuery } from "."
import { useSearch } from "@flows/lib/useSearch"
import { useDebounce } from "@flows/lib/utils"

export type Stream = {
  format: string
  url: string
}

export type Radio = {
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
  const boundsParams = bounds
    ? `?north=${bounds.north}&east=${bounds.east}&south=${bounds.south}&west=${bounds.west}`
    : ""
  const debouncedParams = useDebounce(boundsParams, 200)
  return useApiQuery<Radios>(`/radios${debouncedParams}`)
}
