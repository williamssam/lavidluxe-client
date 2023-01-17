export interface FluttwerwaveResponse {
  status: string
  message: string
  data: Data
}

export interface Data {
  id: number
  tx_ref: string
  flw_ref: string
  device_fingerprint: string
  amount: number
  currency: string
  charged_amount: number
  app_fee: number
  merchant_fee: number
  processor_response: string
  auth_model: string
  ip: string
  narration: string
  status: string
  payment_type: string
  created_at: Date
  account_id: number
  meta: Meta
  amount_settled: number
  customer: Customer
}

export interface Customer {
  id: number
  name: string
  phone_number: string
  email: string
  created_at: Date
}

export interface Meta {
  __CheckoutInitAddress: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  customerNote: string
}
