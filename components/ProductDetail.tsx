import { Product } from 'models/productModel'
import Image from 'next/image'
import Link from 'next/link'
import { blurDataURL } from 'utils/dataURl'
import { formatCurrency } from 'utils/functions/formatCurrency'
import { getPercentageDecrease } from 'utils/functions/getPercentage'
import { urlFor } from 'utils/sanity/client'

type ProductDetailProps = {
  product: Product
  category: String
}
export const ProductDetail = ({ product, category }: ProductDetailProps) => {
  return (
    <Link
      href={`/shop/${category}/${product.slug.current}`}
      className='group transition-colors'>
      <div className='relative h-96 overflow-hidden rounded lg:h-[35rem]'>
        <Image
          alt={product?.name}
          src={urlFor(product?.image).auto('format').url()}
          fill={true}
          sizes='1080, 560'
          placeholder='blur'
          blurDataURL={blurDataURL}
          className={`rounded object-cover transition-all hover:scale-110 ${
            product?.stockStatus === 'in-stock'
              ? 'grayscale-0'
              : 'opacity-50 grayscale'
          }`}
        />

        {product?.promo?.promoOn ? (
          <p className='absolute top-3 right-3 rounded bg-[#333333] py-2 px-4 text-xs font-bold tracking-wider text-white'>
            {getPercentageDecrease(product?.promo?.promoPrice, product?.price)}%
          </p>
        ) : null}
        {product?.stockStatus !== 'in-stock' ? (
          <p className='absolute top-3 left-3 rounded bg-red-600 py-2 px-4 text-xs font-bold uppercase tracking-wider text-white'>
            Out of stock
          </p>
        ) : null}
      </div>
      <div className='text-center'>
        <p className='pt-5 text-xs font-bold uppercase tracking-[2px] text-[#333333] group-hover:text-blue-700 md:tracking-[4px]'>
          {product?.name}
        </p>
        <div className='flex items-center justify-center gap-3 pt-1'>
          <p
            className={`text-xs text-[#8c8c8c] ${
              product?.promo?.promoOn ? 'line-through' : 'no-underline'
            }`}>
            {formatCurrency(product?.price)}
          </p>
          {product?.promo?.promoOn ? (
            <p className='text-xs font-bold text-[#8c8c8c]'>
              {formatCurrency(product.promo.promoPrice)}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
