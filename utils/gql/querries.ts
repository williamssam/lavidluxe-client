import { gql } from '@apollo/client'

export const GET_ALL_PRODUCTS = gql`
  query GETPRODUCTS {
    products(first: 5) {
      nodes {
        id
        databaseId
        name
      }
    }
  }
`
