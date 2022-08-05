import Radios from "@flows/components/Radios"
import Map from "@flows/components/Map"
import { useEffect, useState } from "react"

const HttpWarning = () => {
  const [dismissed, setDimissed] = useState(true)
  const [httpLocation, setHttpLocation] = useState("")

  useEffect(() => {
    setHttpLocation(window.location.origin.replace(/^https:/, "http:") + window.location.pathname)
    setDimissed(window.location.protocol === "http:")
  }, [setDimissed, setHttpLocation])

  if (dismissed) return null

  return (
    <div className='pt-4 grid place-items-center'>
      <div
        className='w-3/4 bg-orange-100 border border-orange-400 text-orange-700 pl-4 pr-9 py-3 rounded relative'
        role='warning'
      >
        <strong className='font-bold'>Warning!</strong>
        {" "}
        <span className='block sm:inline'>
          You are viewing the https version of this page, which may prevent some radios from playing. Feel free to visit
          the http version of the page at <a href={httpLocation}>{httpLocation}</a>
        </span>
        <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
          <svg
            onClick={() => setDimissed(true)}
            className='fill-current h-6 w-6 text-orange-500'
            role='button'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <title>Close</title>
            <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Map />
      <HttpWarning />
      <Radios />
    </>
  )
}
