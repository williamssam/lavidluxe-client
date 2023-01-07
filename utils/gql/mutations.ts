import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation createOrder(
    $paymentMethod: String!
    $paymentMethodTitle: String!
    $address1: String!
    $city: String!
    $email: String!
    $state: String!
    $phone: String!
    $firstName: String!
    $lastName: String!
    $transactionId: String!
    $lineItems: [LineItemInput]
    $feeLines: [FeeLineInput]
  ) {
    createOrder(
      input: {
        isPaid: true
        lineItems: $lineItems
        feeLines: $feeLines
        paymentMethod: $paymentMethod
        paymentMethodTitle: $paymentMethodTitle
        transactionId: $transactionId
        shipping: {
          address1: $address1
          city: $city
          firstName: $firstName
          lastName: $lastName
          state: "Lagos"
          country: NG
        }
        billing: {
          firstName: $firstName
          lastName: $lastName
          address1: $address1
          city: $city
          state: $state
          country: NG
          email: $email
          phone: $phone
        }
        shippingLines: {
          methodId: "shipping_within_lagos"
          methodTitle: "Shipping within Lagos, Nigeria"
          total: "1500"
        }
      }
    ) {
      orderId
    }
  }
`
