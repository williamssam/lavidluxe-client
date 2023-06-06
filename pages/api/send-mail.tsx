import { generateMailTemplate } from 'lib/generateMailTemplate'
import { getFile } from 'lib/getFile'
import { sendMail } from 'lib/transporter'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    recipient,
    address,
    name,
    phone_number,
    total,
    subtotal,
    order_id,
    year,
    items,
    deliveryMethod,
  } = req.body

  const replacements = {
    recipient,
    name,
    address,
    phone_number,
    total,
    subtotal,
    order_id,
    year,
    items,
    deliveryMethod,
  }

  const userMailContent = await getFile('mail', 'user-order-confirmtion.html')
  const adminMailContent = await getFile('mail', 'admin-order-confirmtion.html')
  const userMailToSend = generateMailTemplate(userMailContent, replacements)
  const adminHtmlToSend = generateMailTemplate(adminMailContent, replacements)

  switch (req.method) {
    case 'POST':
      try {
        sendMail({
          recipient,
          html: userMailToSend,
          subject: 'Thank you! Your order is confirmed.',
        })
          .then(() => {})
          .catch(err => console.log(err))

        // send order mail to admin after 3seconds
        setTimeout(() => {
          sendMail({
            recipient:
              process.env.NODE_ENV === 'development'
                ? (process.env.ADMIN_TEST_EMAIL as string)
                : (process.env.ADMIN_MAIL as string),
            html: adminHtmlToSend,
            subject: `Hi Stella, You have a new order from ${name}! 🎉👏`,
          })
            .then(() => {})
            .catch(err => console.log(err))
        }, 3000)
        res.status(200).json({
          message: 'Email sent successfully',
          success: true,
        })
        res.end()
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({
            message: err.message,
            success: false,
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
