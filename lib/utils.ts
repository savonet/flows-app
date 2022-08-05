import { useState, useEffect } from "react"

export type Stream = {
  id: number
  format: string
  url: string
}

export type Radio = {
  name: string
  website?: string
  description?: string
  genre?: string
  logo?: string
  longitude?: number
  latitude?: number
  artist?: string
  title?: string
  streams: Stream[]
}

export const stringOfError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return `${error}`
}

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
