import '../styles/globals.scss'
import 'react-modern-drawer/dist/index.css'
import NextNProgress from 'nextjs-progressbar'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#02cb9a" />
      <Component {...pageProps} />
    </>
  )
}
