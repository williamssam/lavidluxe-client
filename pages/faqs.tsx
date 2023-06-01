import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Footer } from 'components/Footer'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import Head from 'next/head'
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
      <Head>
        <title>FAQ - Laviluxe Clothings</title>
      </Head>
      <section
        className={`px-5 pt-24 transition-all md:px-20 md:pt-28 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <h2 className='text-center font-vollkorn text-xl font-bold uppercase tracking-[5px] text-dark md:text-3xl'>
          Frequently Asked Questions
        </h2>
        <p className='text-center text-xs'>
          Need Help? We&apos;ve got you covered!
        </p>

        <div className='mx-auto flex max-w-4xl flex-col gap-4 py-10'>
          {faqs.map(faq => (
            <Disclosure key={faq.id}>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex w-full justify-between border-b border-b-gray-200 py-2 pb-4 text-left font-medium last:border-0 focus-within:ring-main focus:outline-none focus-visible:ring-2'>
                    <span className={`${open ? 'text-main' : ''}`}>
                      {faq.question}
                    </span>
                    <ChevronUpIcon
                      className={`transition-transform duration-300 ease-in-out ${
                        open ? 'rotate-180 transform text-main' : ''
                      } h-5 w-5`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'>
                    <Disclosure.Panel className='py-3 text-sm leading-6 text-gray-500'>
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>

        {/* <div className='mx-auto max-w-4xl py-10'>
          <p>
            If you have an issue or question that requires immediate assistance,
            you can click the button below to chat live with a Customer Service
            representative.
          </p>
          <button>Message us</button>
        </div> */}
      </section>

      <Footer />
    </>
  )
}

Faqs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Faqs
