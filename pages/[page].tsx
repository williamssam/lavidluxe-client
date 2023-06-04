import fs from 'fs'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { convertMDToHtml } from 'lib/convertMDToHtml'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { NextSeo } from 'next-seo'
import path from 'path'
import { ReactElement } from 'react'
import { openCartDrawer } from 'store/atoms'

type DocMD = {
  data: {
    contentHtml: string
    id: string
    title?: string
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const directory = path.join(process.cwd(), 'docs')
  const files = fs.readdirSync(directory)
  const paths = files.map(file => ({
    params: {
      page: file.replace('.md', ''),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<DocMD> = async context => {
  const data = await convertMDToHtml(context.params?.page as string)

  return {
    props: {
      data,
    },
  }
}

const ShippingReturnPolicy = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [openCart] = useAtom(openCartDrawer)

  return (
    <>
      <NextSeo title={data && data?.title} />

      <main
        className={`px-5 py-24 transition-all md:px-20 md:py-28 ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <section
          dangerouslySetInnerHTML={{ __html: data?.contentHtml }}
          className='prose prose-base mx-auto max-w-none prose-h2:font-vollkorn prose-h2:uppercase prose-h2:tracking-[4px] prose-h2:text-dark prose-a:text-main lg:prose-h2:text-4xl'
        />
      </main>
    </>
  )
}

ShippingReturnPolicy.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ShippingReturnPolicy
