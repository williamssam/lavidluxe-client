import nodemailer from 'nodemailer'

type SendMailParams = {
  recipient: string
  html: string
  subject: string
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
})

export const sendMail = async ({
  recipient,
  html,
  subject,
}: SendMailParams) => {
  return await transporter.sendMail({
    from: `LavidLuxe Clothings - <lavidluxe@gmail.com>`,
    to: recipient,
    subject,
    html: html,
  })
}
