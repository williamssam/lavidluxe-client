import { XCircleIcon } from '@heroicons/react/20/solid'
import { Filter } from 'components/Filter'
import { ProductDetail } from 'components/ProductDetail'
import { Tabs } from 'components/Tabs'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { ProductCategories } from 'models/productsModel'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { openCartDrawer } from 'store/drawerAtom'
import { client } from 'utils/apollo/ApolloWrapper'
import { GET_ALL_CATEGORY_PRODUCTS } from 'utils/gql/querries'

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: GET_ALL_CATEGORY_PRODUCTS,
  })

  return {
    props: {
      data: data.productCategories,
    },
  }
}

type StoreProps = {
  data: ProductCategories
}

const Store = ({ data }: StoreProps) => {
  const { nodes: categories } = data
  // const [currentSort, setCurrentSort] = useState('default')
  const sort = ['Latest', 'Oldest', 'Price: low to high', 'Price: high to low']

  console.log('data', data)

  const [column, setColumn] = useState(3)
  const [openCart] = useAtom(openCartDrawer)
  const router = useRouter()
  const { slug } = router.query

  // const sortTypes = {
  //   up: {
  //     type: 'price: high to low',
  //     fn: (a: { price: number }, b: { price: number }) => a.price - b.price,
  //   },
  //   down: {
  //     type: 'price: low to high',
  //     fn: (a: { price: number }, b: { price: number }) => b.price - a.price,
  //   },
  //   default: {
  //     type: 'default',
  //     fn: (a: any, b: any) => a,
  //   },
  // }

  // const onSortChange = () => {
  //   let nextSort: string

  //   if (currentSort === 'down') {
  //     nextSort = 'up'
  //   } else if (currentSort === 'up') {
  //     nextSort = 'default'
  //   } else if (currentSort === 'default') {
  //     nextSort = 'down'
  //   }

  //   setCurrentSort(nextSort!)
  // }

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
        <Filter setColumn={setColumn} column={column} sort={sort} />

        <div
          className={`grid grid-cols-1 gap-x-8 gap-y-12 pt-3 transition-all sm:grid-cols-2 ${
            column === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
          }`}>
          {categories?.map(
            category =>
              category.slug === slug &&
              (category.products.nodes.length > 0 ? (
                category.products.nodes?.map(product => (
                  <ProductDetail product={product} key={product.id} />
                ))
              ) : (
                <div className='bg-gray-100 py-6 px-3 lg:px-16 rounded font-vollkorn w-max flex flex-col items-center col-span-full place-self-center mt-10'>
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
      </main>
    </>
  )
}

Store.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Store
