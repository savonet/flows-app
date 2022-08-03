import { useState, useEffect } from "react"

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
