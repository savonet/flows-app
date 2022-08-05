import { Marker, GoogleMap, useLoadScript } from "@react-google-maps/api"
import { useRadios } from "@flows/lib/api/radio"
import { useState, useCallback } from "react"
import { type Radio } from "@flows/lib/utils"
import { useSearch, type Position, type Bounds } from "@flows/lib/useSearch"

const containerStyle = {
  width: "100%",
  height: "600px",
}

const API_KEY = "AIzaSyAyI_VGiugs-XG_1fEW-03hzIaVRMnHwP4"

const RadioMarker = ({ name, latitude, longitude }: Radio) => {
  const [hover, setHover] = useState(false)

  if (!latitude || !longitude) return null

  const onMouseOver = (e: google.maps.MapMouseEvent) => {
    e.stop()
    setHover(true)
  }

  const onMouseOut = (e: google.maps.MapMouseEvent) => {
    e.stop()
    setHover(false)
  }

  return (
    <Marker
      animation={hover ? google.maps.Animation.BOUNCE : undefined}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      position={{ lat: latitude, lng: longitude }}
      title={name}
    />
  )
}

const saveBounds = (map: google.maps.Map | undefined, setBounds: (_: Bounds) => void) => {
  if (!map) return

  const bounds = map.getBounds()

  if (!bounds) return

  setBounds(bounds.toJSON())
}

const saveZoom = (map: google.maps.Map | undefined, setZoom: (_: number) => void) => {
  if (!map) return

  const zoom = map.getZoom()

  if (!zoom) return

  setZoom(zoom)
}

const saveCenter = (map: google.maps.Map | undefined, setCenter: (_: Position) => void) => {
  if (!map) return

  const center = map.getCenter()

  if (!center) return

  setCenter(center.toJSON())
}

type MapProps = {
  setBounds: (bounds: Bounds) => void
  zoom: number
  setZoom: (_: number) => void
  center: Position
  setCenter: (_: Position) => void
}

const MapWithValues = (props: MapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  })
  const radiosQuery = useRadios()
  const [map, setMap] = useState<google.maps.Map | undefined>()
  const [zoom] = useState(props.zoom)
  const [center] = useState(props.center)
  const { setZoom, setCenter, setBounds } = props

  const onLoad = useCallback((m: google.maps.Map) => setMap(m), [setMap])
  const onUnmount = useCallback(() => setMap(undefined), [setMap])
  const onBoundsChanged = useCallback(() => saveBounds(map, setBounds), [setBounds, map])
  const onZoomChanged = useCallback(() => saveZoom(map, setZoom), [setZoom, map])
  const onCenterChanged = useCallback(() => saveCenter(map, setCenter), [setCenter, map])

  const radios = radiosQuery.status === "loaded" ? radiosQuery.data.data : undefined

  const markers = () => {
    if (!radios) return null

    return radios.map((props, key) => {
      return <RadioMarker {...props} key={key} />
    })
  }

  if (!isLoaded) return <p>Loading map..</p>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onCenterChanged={onCenterChanged}
      zoom={zoom}
      onZoomChanged={onZoomChanged}
      onBoundsChanged={onBoundsChanged}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers()}
    </GoogleMap>
  )
}

export default function Map() {
  const search = useSearch()

  if (!search.isLoaded) return <p>Loading map..</p>

  return <MapWithValues {...search} />
}
