// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export type Data = {
  status: string
  message: string
  data?: {
    link: string
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { amount, email, phonenumber, name } = req.body
//   switch (req.method) {
//     case 'POST':
//       try {
//         let response = await fetch('https://api.flutterwave.com/v3/payments', {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
//           },
//           method: 'POST',
//           body: JSON.stringify({
//             tx_ref: nanoid(),
//             amount,
//             currency: 'NGN',
//             redirect_url: 'http://localhost:3000/checkout/order-successful',
//             customer: {
//               email,
//               phonenumber,
//               name,
//             },
//             customizations: {
//               title: 'Lavidluxe Store',
//               logo: 'https://lavidluxe.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.886d38a9.png&w=750&q=75',
//             },
//           }),
//         })
//         return res.status(200).send(await response.json())
//       } catch (err) {
//         if (err instanceof Error) {
//           res.status(400).json({
//             message: err.message,
//             status: '',
//           })
//         }
//         // res.end()
//       }
//       break
//     default:
//       res.setHeader('Allow', ['POST'])
//       res.status(405).json({
//         message: `Method ${req.method} Not Allowed`,
//         status: '405',
//       })
//       res.end()
//       break
//   }
// }
