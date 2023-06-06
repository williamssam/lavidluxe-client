import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { ProductFooter } from 'components/ProductFooter'
import { QuantityPicker } from 'components/QuantityPicker'
import { Select } from 'components/Select'
import { Timer } from 'components/Timer'
import { useAtom } from 'jotai'
import { Layout } from 'layouts/Layout'
import { Product } from 'models/productModel'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, Reducer, useReducer, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import { toast } from 'react-toastify'
import { openCartDrawer } from 'store/atoms'
import { useCartStore } from 'store/cartStore'
import { checkDate } from 'utils/functions/checkDate'
import { formatCurrency } from 'utils/functions/formatCurrency'
import { client, urlFor } from 'utils/sanity/client'

const getProduct = async (slug: string) => {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug && !(_id in path('drafts.**'))] {
      name, price, image, slug, _id, stockStatus, description, sizes, tags, productColors, promo
    }`,
    { slug }
  )
  return product as Product[]
}

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['product', context.params?.id],
    queryFn: () => getProduct(context.params?.id as string),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

type InitialState = {
  productQuantity: number
}

const ProductDetails = () => {
  const addToCart = useCartStore(state => state.addToCart)
  const [openCart] = useAtom(openCartDrawer)
  const router = useRouter()

  const { data: product } = useQuery({
    queryKey: ['product', router.query.id],
    queryFn: () => getProduct(router.query.id as string),
    select: data => data.at(0),
  })

  const [value, updateValue] = useReducer<Reducer<InitialState, any>>(
    (prev, next) => {
      return { ...prev, ...next }
    },
    { productQuantity: 1 }
  )

  const sizes = product!.sizes?.split(',').map(num => +num)
  const [selectedSize, setSelectedSize] = useState<number | string>(
    sizes ? sizes[0] : ''
  )
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.productColors.length ? product.productColors[0] : ''
  )

  const addProductToCart = (product: Product) => {
    addToCart(
      {
        id: product._id,
        image: urlFor(product.image).auto('format').url(),
        name: product?.name,
        price: product?.promo?.promoOn
          ? product.promo.promoPrice
          : product.price,
        size: selectedSize,
        color: selectedColor,
      },
      value.productQuantity
    )

    toast.success(`🥳 '${product.name}' added to your cart`)
  }

  return (
    <>
      <NextSeo title={product?.name} description={product?.description} />

      {product ? (
        <main
          className={`grid min-h-screen grid-cols-1 items-center overflow-hidden transition-all lg:grid-cols-5 ${
            openCart ? 'mr-96 -ml-96' : 'mr-0 -ml-0'
          }`}>
          <InnerImageZoom
            src={urlFor(product.image).auto('format').url()}
            zoomSrc={urlFor(product?.image).auto('format').url()}
            className='mt-16 h-[30rem] bg-main/10 object-cover object-top sm:h-[35rem] md:col-span-3 md:mt-0 md:h-[35rem] lg:h-screen'
            zoomType='hover'
            zoomPreload={true}
            fullscreenOnMobile={true}
            imgAttributes={{ alt: product.name }}
          />

          <section className='justify-end self-center px-3 py-5 md:col-span-2 md:px-16 md:pb-0 lg:px-10 xl:px-16'>
            <button
              className='mb-5 flex items-center gap-2 text-xs'
              onClick={() => router.back()}>
              <ArrowLeftIcon className='h-4 w-4' />
              Back to shop
            </button>
            <header className='text-left'>
              <div>
                <div className='flex w-full flex-wrap items-center gap-4'>
                  {product?.stockStatus === 'in-stock' ? (
                    <p className='w-max rounded bg-emerald-100 py-[2px] px-2 text-[0.6rem] font-black uppercase tracking-[3px] text-emerald-500'>
                      In stock
                    </p>
                  ) : (
                    <p className='w-max rounded bg-gray-200 py-[2px] px-2 text-[0.6rem] font-black uppercase tracking-[3px] text-gray-500'>
                      Out of stock
                    </p>
                  )}

                  {product?.tags
                    ? product.tags?.map(tag => (
                        <p
                          className='text-left text-[0.65rem] font-bold text-main'
                          key={tag}>
                          #{tag}
                        </p>
                      ))
                    : null}
                </div>
                <h2 className='pt-1 text-left text-xl font-black uppercase tracking-[3px] text-gray-700 md:text-2xl md:tracking-[5px]'>
                  {product?.name}
                </h2>
              </div>

              <div className='flex items-center gap-2 pt-1'>
                <p
                  className={`text-[#8c8c8c] ${
                    product?.promo?.promoOn
                      ? 'text-xs font-normal line-through'
                      : 'text-sm font-bold no-underline'
                  }`}>
                  {formatCurrency(product?.price)}
                </p>
                {product?.promo?.promoOn ? (
                  <p className='text-sm font-bold text-[#8c8c8c]'>
                    {formatCurrency(product.promo.promoPrice)}
                  </p>
                ) : null}
              </div>
            </header>

            {product?.promo?.promoOn && checkDate(product.promo.promoStart) ? (
              <Timer deadline={product.promo.promoEnd} />
            ) : null}

            {product?.description ? (
              <div className='max-w-[55ch] pt-10 font-vollkorn text-base leading-7 md:text-left lg:pt-5 xl:pt-10 '>
                <p>{product.description}</p>
              </div>
            ) : null}

            <div className='mt-10 flex items-center justify-between border-y border-y-gray-200 py-1 text-xs'>
              {sizes ? (
                <div className='flex items-center gap-3'>
                  <h3 className='font-bold uppercase tracking-[2px] text-gray-500'>
                    Size
                  </h3>
                  <Select
                    data={sizes}
                    selected={selectedSize}
                    setSelected={setSelectedSize}
                    className='w-24'
                  />
                </div>
              ) : null}

              {product?.productColors?.length &&
              !product?.productColors?.includes('') ? (
                <div className='flex items-center gap-3'>
                  <h3 className='font-bold uppercase tracking-[2px] text-gray-500'>
                    Color
                  </h3>

                  <Select
                    data={product.productColors}
                    selected={selectedColor}
                    setSelected={setSelectedColor}
                    className='w-24 !capitalize'
                  />
                </div>
              ) : null}
            </div>

            {product?.stockStatus === 'in-stock' ? (
              <div className='mt-8 flex items-center justify-center gap-8 md:flex-row md:justify-start'>
                <QuantityPicker
                  onDecrease={() => {
                    if (value.productQuantity === 1) return
                    updateValue({ productQuantity: value.productQuantity - 1 })
                  }}
                  onIncrease={() =>
                    updateValue({ productQuantity: value.productQuantity + 1 })
                  }
                  quantity={value.productQuantity}
                />

                <button
                  onClick={() => addProductToCart(product)}
                  type='button'
                  className='w-full rounded bg-main py-4 px-10 text-xs font-bold uppercase tracking-[5px] text-white transition-all hover:bg-dark active:scale-[0.98]'>
                  Add to cart
                </button>
              </div>
            ) : (
              <div className='mt-8 bg-gray-200 p-2 text-center text-sm'>
                <p>Product is currently out of stock.</p>
                <p>
                  Kindly check back or{' '}
                  <Link href='/contact' className='text-main underline'>
                    contact us
                  </Link>{' '}
                  to request.
                </p>
              </div>
            )}

            <ProductFooter name={product?.name} />
          </section>
        </main>
      ) : null}
    </>
  )
}

ProductDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ProductDetails
