import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { PropsWithChildren } from 'react'
import { serverUrl } from 'utils/endpoints'

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: serverUrl,
    credentials: 'same-origin',
    headers: {
      consumerKey: process.env.WC_CONSUMER_KEY,
      consumerSecret: process.env.WC_CONSUMER_SECRET,
    },
  }),
  cache: new InMemoryCache(),
})

const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloWrapper
