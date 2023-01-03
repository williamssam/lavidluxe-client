import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation CREATEORDER {
    createOrder(input: { isPaid: true }) {
      order {
        paymentMethod
        status
        needsPayment
        datePaid
        shipping {
          address1
          city
          email
          firstName
          lastName
          phone
          state
          company
        }
        lineItems {
          nodes {
            productId
            quantity
          }
        }
      }
    }
  }
`
