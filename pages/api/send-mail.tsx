// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { promises as fs } from 'fs'
import handlebars from 'handlebars'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const OAuth2 = google.auth.OAuth2

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

  const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    })

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err: Error, token: string) => {
        if (err) {
          reject('Failed to create access token :( ' + err)
        }
        resolve(token)
      })
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SENDER_EMAIL,
        accessToken,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    })

    return transporter
  }

  const jsonDirectory = path.join(process.cwd(), 'mail')
  const fileContents = await fs.readFile(
    jsonDirectory + '/template.html',
    'utf8'
  )
  const template = handlebars.compile(fileContents)
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
          from: `"LavidLuxe" ${process.env.SENDER_EMAIL}`,
          to: recipient,
          subject: 'Thank you! Your order is confirmed.',
          generateTextFromHTML: true,
          html: htmlToSend,
        }

        console.log('mail options', mailOptions)
        let emailTransporter = await createTransporter()

        emailTransporter.sendMail(
          mailOptions,
          (error: Error, response: any) => {
            error
              ? res.status(400).json({ message: 'Message not sent', error })
              : res
                  .status(200)
                  .json({ message: 'Mail sent successfully!', response })
            emailTransporter.close()
          }
        )
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
