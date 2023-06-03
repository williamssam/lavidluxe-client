// Api to send new order notification to admin on whatsapp
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message } = req.body

  switch (req.method) {
    case 'POST':
      try {
        const response = await fetch(
          `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_BUSINESS_PHONE_NUMBER_ID}/messages`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
              Accept: '*/*',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              recipient_type: 'individual',
              to: '2348138505782',
              type: 'template',
              template: {
                name: 'hello_world',
                language: {
                  code: 'en_US',
                },
              },
            }),
          }
        )

        if (response.ok) {
          return res.status(200).json({
            message: 'Message sent successfully!',
            status: true,
            response,
          })
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
