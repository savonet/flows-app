import { useApiQuery } from "."
import { useSearch } from "@flows/lib/useSearch"
import { useDebounce, type Radio } from "@flows/lib/utils"

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
