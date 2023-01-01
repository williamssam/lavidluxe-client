import { ErrorFallback } from 'components/ErrorFallback'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import 'styles/globals.css'
import 'swiper/css/bundle'
import ApolloWrapper from 'utils/apollo/ApolloWrapper'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available - https://nextjs.org/docs/basic-features/layouts
  const getLayout = Component.getLayout ?? (page => page)
  // const previousRoute = usePreviousRoute()

  return getLayout(
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => typeof window !== undefined && window.location.reload()}>
      <ApolloWrapper>
        <Component {...pageProps} />
      </ApolloWrapper>
    </ErrorBoundary>
  )
}

export default App
