import { gql } from '@apollo/client'

export const GET_ALL_CATEGORY_PRODUCTS = gql`
  query productCategories {
    categories {
      id
      slug
      name
      products(first: 12, orderBy: publishedAt_DESC) {
        id
        images {
          url
        }
        name
        price
        slug
        stockStatus {
          name
        }
      }
    }
  }
`

export const GET_FIRST_TEN_PRODUCTS_ID = gql`
  query getFirstTenProducts {
    products(first: 10) {
      id
    }
  }
`

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(where: { id: $id }) {
      description
      createdAt
      id
      name
      price
      images {
        url
      }
      stockStatus {
        name
      }
      slug
      variants {
        ... on ProductColorVariant {
          id
          name
        }
      }
    }
  }
`
