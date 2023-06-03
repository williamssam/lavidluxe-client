import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { openCartDrawer } from 'store/atoms'
import { client } from 'utils/sanity/client'

type FAQs = {
  _id: string
  faqs: {
    _key: string
    answer: string
    question: string
  }[]
}[]

export const getStaticProps: GetStaticProps<{ data: FAQs }> = async () => {
  const data = await client.fetch(
    `*[_type == "faqs" && !(_id in path('drafts.**'))] {
      _id,
      faqs
    }`
  )

  return {
    props: {
      data,
    },
  }
}

const Faqs = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <Head>
        <title>FAQ - Laviluxe Clothings</title>
      </Head>
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
          {data[0].faqs?.length > 0 ? (
            data[0].faqs.map(faq => (
              <li key={faq._key}>
                <h3 className='font-bold'>{faq.question}</h3>
                <p className='pt-1 text-sm leading-6'>{faq.answer}</p>
              </li>
            ))
          ) : (
            <li className='text-center text-sm'>No FAQs found</li>
          )}
        </ul>

        {/* <div className='mx-auto max-w-4xl py-10'>
          <p>
            If you have an issue or question that requires immediate assistance,
            you can click the button below to chat live with a Customer Service
            representative.
          </p>
          <button>Message us</button>
        </div> */}
      </main>
    </>
  )
}

Faqs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Faqs
