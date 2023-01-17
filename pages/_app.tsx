import { ErrorFallback } from 'components/ErrorFallback'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import type { ReactElement, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import 'styles/globals.css'
import 'styles/page-loader.css'
import 'swiper/css/bundle'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

NProgress.configure({ easing: 'ease', speed: 500 })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available - https://nextjs.org/docs/basic-features/layouts
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => typeof window !== undefined && window.location.reload()}>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default App
