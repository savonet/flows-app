import "@flows/styles/globals.css"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { SWRConfig } from "swr"
import Script from "next/script"
import type { AppProps } from "next/app"
import { apiQuery } from "@flows/lib/api"
import { SearchProvider } from "@flows/lib/useSearch"
import { AudioProvider } from "@flows/lib/useAudioContext"

const ApiSWRConfig = ({ children }: { children: React.ReactNode }) => {
  const fetcher = (path: string) => apiQuery(path, { method: "GET" })

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
}

const navigation = [
  { name: "Flows", href: "#", current: true },
  { name: "Liquidsoap", href: "https://www.liquidsoap.info/", current: false },
]

const classNames = (...classes: unknown[]) => classes.filter(Boolean).join(" ")

const Template = ({ Component, pageProps }: AppProps) => (
  <div className='min-h-full'>
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <svg
                    className='navbar-nav-svg'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 600 600'
                    focusable='false'
                    style={{ width: "25px", height: "25px" }}
                  >
                    <title>Liquidsoap</title>
                    <style type='text/css'>{".st0{fill:#FFFFFF;}"}</style>
                    <g>
                      <path
                        className='st0'
                        d='M102.4,593.8c-0.7-2.8-3.4-2.5-5.3-3.3c-24.6-10.2-37.2-28.7-37.2-55.6c-0.1-72.1,0-144.2,0-216.3
          c0-52.3,0-104.6,0-156.9c0-37.6,23.1-60.9,60.6-61.1c12-0.1,23.9-0.2,35.9,0c15.7,0.3,26.7,10.1,26.3,23
          c-0.4,12.5-11.1,21.5-26.3,21.8c-12,0.2-23.9-0.1-35.9,0.1c-11.8,0.1-15.6,3.7-15.6,15.3c-0.1,124.4,0,248.8-0.1,373.2
          c0,10.3,4.5,15.1,14.8,15.1c69.1-0.1,138.2,0,207.3-0.1c12.3,0,15.5-3.7,15.5-17.7c0-74.7,0-149.4,0-224.2c0-47.8,0-95.6,0-143.5
          c0-15.2-3-18.1-18.4-18.2c-10.8,0-21.7,0.1-32.5,0c-16-0.2-26.7-9.4-26.6-22.5c0.1-13,10.9-22.1,26.9-22.3
          c13.4-0.2,26.9-0.3,40.3,0.1c30.8,1,54.9,24.5,55,55.2c0.3,127.4,0.3,254.8,0.1,382.2c0,25.5-15.8,45.7-40.2,53.3
          c-1.7,0.5-3.8,0-4.5,2.4C262.3,593.8,182.4,593.8,102.4,593.8z'
                      ></path>
                      <path
                        className='st0'
                        d='M537.4,212.6c-16.8,23-56.5,16.5-68.6-9.5c-8-17.2-12.4-32.7-12-54.5c4.6,4.1,8.3,7.5,12.1,10.7
          c10.3,8.6,21,14,35.5,11.8c12.5-1.9,21.5,6,28.2,16.3c2,3,1.3,7.3,4.8,9.5C537.4,202.2,537.4,207.4,537.4,212.6z'
                      ></path>
                      <path
                        className='st0'
                        d='M200.6,230.4c0-55.3,0-110.5,0-165.8c0-40.7,22.3-62.7,63.2-62.7c50.4,0,100.8,0,151.3,0
          c36.1,0,59.1,21.9,60.4,57.7c0.5,13.1,0.4,26.1,0,39.2c-0.4,15.1-10.1,25.8-22.5,25.7c-12-0.1-21.6-10.1-22.3-24.8
          c-0.6-12.7-0.4-25.4-0.1-38.1c0.2-10.4-4.5-14.9-14.9-14.9c-51.5,0.1-103.1,0-154.6,0.1c-12.7,0-15.5,3.2-15.5,17.5
          c0,105.3,0,210.6,0,316c0,7.8,0.1,15.7,0,23.5c-0.2,17.5-9.4,28.9-23,28.6c-13.5-0.3-21.9-10.9-21.9-28.3
          C200.6,346.2,200.6,288.3,200.6,230.4z'
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {navigation.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className='-mr-2 flex md:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navigation.map(item => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

    <main>
      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <Component {...pageProps} />
      </div>
    </main>
  </div>
)

const FlowsApp = (props: AppProps) => (
  <>
    <Script src='/__ENV.js' strategy='beforeInteractive' />
    <ApiSWRConfig>
      <AudioProvider>
        <SearchProvider>
          <Template {...props} />
        </SearchProvider>
      </AudioProvider>
    </ApiSWRConfig>
  </>
)

export default FlowsApp
