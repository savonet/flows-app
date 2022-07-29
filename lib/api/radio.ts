import { useApiQuery } from "."

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

export const useRadios = () => useApiQuery<Radio[]>("/radios")
