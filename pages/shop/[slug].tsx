import { XCircleIcon } from '@heroicons/react/20/solid'
import { Filter } from 'components/Filter'
import { ProductDetail } from 'components/ProductDetail'
import { Tabs } from 'components/Tabs'
import { useAnimate } from 'hooks/useAnimate'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { Categories } from 'models/productModel'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { openCartDrawer } from 'store/atoms'
import { client } from 'utils/apollo/ApolloWrapper'
import { GET_ALL_CATEGORY_PRODUCTS } from 'utils/gql/queries'

type ProductType = Categories

export const getServerSideProps: GetServerSideProps<{
  data: Categories
}> = async () => {
  const { data } = await client.query<Categories>({
    query: GET_ALL_CATEGORY_PRODUCTS,
  })

  return {
    props: {
      data: data,
    },
  }
}

const Shop = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { categories } = data
  const { parent } = useAnimate()

  console.log('categories', categories)

  // console.log('data', data)
  const sort = ['Latest', 'Oldest', 'Price: low to high', 'Price: high to low']
  const [selected, setSelected] = useState<string | number>(sort[0])

  // const [column, setColumn] = useState(3)
  const [openCart] = useAtom(openCartDrawer)
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <Head>
        <title>Shop - Lavidluxe</title>
      </Head>

      <main
        className={`min-h-screen px-4 py-10 md:pt-20 md:pb-10 md:px-16 transition-all ${
          openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
        }`}>
        <Tabs categories={categories} />
        <Filter sort={sort} selected={selected} setSelected={setSelected} />

        <div
          ref={parent}
          className='grid grid-cols-1 gap-x-6 gap-y-12 pt-3 transition-all sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
          {categories?.map(
            category =>
              category.slug === slug &&
              (category.products.length > 0 ? (
                category.products?.map(product => (
                  <ProductDetail product={product} key={product.id} />
                ))
              ) : (
                <div
                  key={category.id}
                  className='bg-gray-100 py-6 px-3 lg:px-16 rounded font-vollkorn w-max flex flex-col items-center col-span-full place-self-center mt-10'>
                  <XCircleIcon className='w-12 h-12' />
                  <p className='mt-3'>
                    No product(s) available under this category
                  </p>
                  <strong className='uppercase tracking-[3px] text-sm'>
                    {router.asPath.slice(6).replace(/-/g, ' ')}
                  </strong>
                </div>
              ))
          )}
        </div>

        {/* {categories.map(category =>
          category.slug == slug && category.products.pageInfo.hasNextPage ? (
            <Pagination
              key={category.id}
              pageInfo={category.products.pageInfo}
            />
          ) : null
        )} */}
      </main>
    </>
  )
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Shop
