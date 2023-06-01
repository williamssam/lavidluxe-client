import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, amount, name, phoneNumber, address, customerNote } = req.body

  switch (req.method) {
    case 'POST':
      try {
        const response = await fetch(
          'https://api.paystack.co/transaction/initialize',
          {
            headers: {
              Authorization: `Bearer ${
                process.env.NODE_ENV === 'production'
                  ? process.env.PAYSTACK_LIVE_SECRET_KEY
                  : process.env.PAYSTACK_TEST_SECRET_KEY
              }`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount * 100,
              email,
              reference: `${nanoid()}`,
              callback_url: `${
                process.env.NODE_ENV === 'production'
                  ? 'https://lavidluxe.com'
                  : 'http://localhost:3300'
              }/checkout/order/successful`,
              metadata: {
                name,
                phoneNumber,
                address,
                customerNote,
                orderID: `#lavidluxe_${nanoid(5)}`,
                custom_fields: [
                  {
                    display_name: 'Customer Name',
                    variable_name: 'Customer Name',
                    value: name,
                  },
                ],
              },
            }),
            method: 'POST',
          }
        )
        const data = await response.json()
        if (response.ok) {
          return res.status(200).json(data)
        }
        res.end()
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({
            status: false,
            message: err.message,
          })
        }
        res.end()
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).json({
        message: `Method ${req.method} Not Allowed`,
        status: '405',
      })
      res.end()
      break
  }
}
