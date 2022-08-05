import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter, type NextRouter } from "next/router"
import { type ParsedUrlQueryInput } from "querystring"
import deepEqual from "deep-equal"
import { type Radio, type Stream } from "@flows/lib/utils"

export type Bounds = {
  north: number
  east: number
  south: number
  west: number
}

export type Position = {
  lat: number
  lng: number
}

export type IsPlaying = {
  stream: Stream
  radio: Radio
}

type SearchContextType = {
  isLoaded: boolean
  bounds: Bounds | undefined
  setBounds: (bounds: Bounds) => void
  zoom: number
  setZoom: (_: number, navigate?: boolean) => void
  center: Position
  setCenter: (_: Position, navigate?: boolean) => void
  isPlaying: IsPlaying | undefined
  setIsPlaying: (_: IsPlaying | undefined) => void
}

export const INITIAL_CENTER: google.maps.LatLngLiteral = {
  lat: 25.536815,
  lng: -7.708163,
}

export const INITIAL_ZOOM = 2

const SearchContext = createContext<SearchContextType>({} as unknown as SearchContextType)

const navigateTo = (router: NextRouter, query: ParsedUrlQueryInput) => {
  if (deepEqual(query, router.query)) return

  router.replace(
    {
      pathname: router.pathname,
      query,
    },
    undefined,
    { scroll: false, shallow: false }
  )
}

const numericValue = (v: unknown, d: number) => {
  if (v === undefined) return d
  if (v === null) return d

  const value = Number(v)

  if (isNaN(value)) return d

  return value
}

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [bounds, setBoundsState] = useState<Bounds | undefined>()
  const [zoom, setZoomState] = useState<number>(INITIAL_ZOOM)
  const [center, setCenterState] = useState<Position>(INITIAL_CENTER)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState<IsPlaying | undefined>()
  const router = useRouter()

  const setBounds = useCallback(
    (b: Bounds) =>
      setBoundsState(bounds => {
        if (deepEqual(bounds, b)) return bounds

        return b
      }),
    [setBoundsState]
  )

  const setCenter = useCallback(
    (pos: Position, navigate = true) =>
      setCenterState(center => {
        if (navigate && router) {
          const { lat: _lat, lng: _lng, ...oldQuery } = router.query

          navigateTo(router, { ...oldQuery, ...pos })
        }

        if (deepEqual(center, pos)) return center

        return pos
      }),
    [setCenterState, router]
  )

  const setZoom = useCallback(
    (z: number, navigate = true) => {
      if (navigate && router) {
        const { zoom: _, ...oldQuery } = router.query

        navigateTo(router, { ...oldQuery, zoom: z })
      }

      setZoomState(z)
    },
    [setZoomState, router]
  )

  useEffect(() => {
    if (isLoaded) return

    if (!router || !router.isReady) return

    setIsLoaded(true)

    const { query } = router

    const pos = {
      lat: numericValue(query.lat, center.lat),
      lng: numericValue(query.lng, center.lng),
    }

    const z = numericValue(query.zoom, zoom)

    setCenter(
      {
        lat: numericValue(query.lat, center.lat),
        lng: numericValue(query.lng, center.lng),
      },
      false
    )

    setZoom(z, false)

    const { lat: _lat, lng: _lng, zoom: _z, ...oldQuery } = router.query

    navigateTo(router, { ...oldQuery, ...pos, zoom: z })
  }, [isLoaded, setIsLoaded, router, center, setCenter, zoom, setZoom])

  return (
    <SearchContext.Provider
      value={{ isLoaded, bounds, setBounds, center, setCenter, zoom, setZoom, isPlaying, setIsPlaying }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
