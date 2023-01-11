import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { PropsWithChildren } from 'react'

export const client = new ApolloClient({
  ssrMode: true,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError)
        console.log(
          `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
        )
    }),
    createHttpLink({
      uri: process.env.SERVER_URL,
      headers: {
        Autorization: `Bearer ${process.env.HYGRAPH_QUERY_AUTORIZATION_TOKEN}`,
      },
    }),
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development',
})

const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloWrapper
