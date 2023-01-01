import { gql } from '@apollo/client'

export const GET_ALL_CATEGORY_PRODUCTS = gql`
  query GETCATEGORYPRODUCTS {
    productCategories {
      nodes {
        id
        name
        slug
        products(first: 10) {
          nodes {
            id
            name
            slug
            onSale
            date
            image {
              sourceUrl
            }
            ... on SimpleProduct {
              regularPrice(format: RAW)
              salePrice(format: RAW)
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
  }
`

export const GET_FIRST_TEN_PRODUCTS_ID = gql`
  query GETFIRSTTENPRODUCTS {
    products(first: 10) {
      nodes {
        id
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query GETPRODUCT($id: ID!) {
    product(id: $id, idType: SLUG) {
      id
      name
      slug
      date
      description(format: RAW)
      onSale
      image {
        sourceUrl
      }
      productTags {
        nodes {
          slug
          name
        }
      }
      ... on SimpleProduct {
        stockStatus
        regularPrice(format: RAW)
        salePrice(format: RAW)
      }
      attributes {
        nodes {
          id
          name
          options
        }
      }
    }
  }
`
