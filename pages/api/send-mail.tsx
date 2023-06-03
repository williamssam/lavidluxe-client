import handlebars from 'handlebars'
import { getFile } from 'lib/getFile'
import { transporter } from 'lib/transporter'
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
  } = req.body

  const fileContent = await getFile('mail', 'order-confirmed-mail.html')
  const template = handlebars.compile(fileContent)
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
  }
  const htmlToSend = template(replacements)

  switch (req.method) {
    case 'POST':
      try {
        let mailOptions = {
          from: `LavidLuxe Clothings - <lavidluxe@gmail.com>`,
          to: recipient,
          subject: 'Thank you! Your order is confirmed.',
          generateTextFromHTML: true,
          html: htmlToSend,
        }

        transporter.sendMail(mailOptions, (err: any, info: any) => {
          if (err) {
            return res.status(400).json({ message: 'Mail not sent', err })
          }
          //
        })
        res.end()
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({
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
