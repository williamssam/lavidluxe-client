import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { ReactElement } from 'react'
import { openCartDrawer } from 'store/atoms'

const faqs = [
  {
    id: 1,
    question: 'Do I need to open an account in order to shop with you?',
    answer:
      'No, you don’t need to. You can make purchases and check out as a guest everytime.',
  },
  {
    id: 2,
    question: 'How do I order?',
    answer:
      'Shop for the items you want and add it to your shopping cart. When you have finished, you can proceed to your shopping cart and check out. Check and ensure that all information is correct before confirming your purchases and payment.',
  },
  {
    id: 3,
    question: 'How do I pay for my orders?',
    answer:
      'We accept payments via Paystack. You can pay with all major credit and debit cards.',
  },
  {
    id: 4,
    question: 'Can I amend and cancel my order?',
    answer:
      'Unfortunately we are unable to cancel an order once it has been placed. This will allow us to pack your orders efficiently and to minimize errors. It is advisable to check your order before placing it.',
  },
  {
    id: 5,
    question: 'Do you deliver nationwide?',
    answer:
      'Yes, we deliver nationwide (everywhere in Nigeria) and other parts of the world.',
  },
  {
    id: 6,
    question: 'How long will it take for you to deliver my order?',
    answer:
      'It takes three (3) working days to deliver within Lagos, Nigeria and three (3) - seven (7) days outside Lagos, Nigeria.',
  },
]

const Faqs = () => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <NextSeo title='FAQs' />

      <main
        className={`px-5 pt-24 transition-all md:px-20 md:pt-28 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <h2 className='text-center font-vollkorn text-xl font-bold uppercase tracking-[5px] text-dark md:text-3xl'>
          Frequently Asked Questions
        </h2>
        <p className='text-center text-xs'>
          Need Help? We&apos;ve got you covered!
        </p>

        <ul className='mx-auto mt-4 grid max-w-5xl gap-10 py-10 lg:grid-cols-2 lg:gap-y-12'>
          {faqs.map(faq => (
            <li key={faq.id}>
              <h3 className='font-bold'>{faq.question}</h3>
              <p className='pt-1 text-sm leading-6'>{faq.answer}</p>
            </li>
          ))}
        </ul>

        <div className='mx-auto max-w-[65ch] py-10 text-center'>
          <p>
            If you have an issue or question that requires immediate assistance,
            you can click the button below to chat live with a Customer Service
            representative.
          </p>
          <Link
            href='/contact'
            className='mt-6 inline-block rounded bg-main py-2 px-10 text-white transition-opacity hover:opacity-90'>
            Message us
          </Link>
        </div>
      </main>
    </>
  )
}

Faqs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Faqs
