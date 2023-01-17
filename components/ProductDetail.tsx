import { Product } from 'models/productModel'
import Image from 'next/image'
import Link from 'next/link'
import { blurDataURL } from 'utils/dataURl'
import { formatCurrency } from 'utils/functions/formatCurrency'
import { getPercentageDecrease } from 'utils/functions/getPercentage'
import { urlFor } from 'utils/sanity/client'

type ProductDetailProps = {
  product: Product
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <Link
      href={`/shop/product/${product.slug.current}`}
      className='group transition-colors'>
      <div className='relative h-80 lg:h-[35rem] overflow-hidden rounded'>
        <Image
          alt={product.name}
          src={urlFor(product.image).auto('format').url()}
          fill={true}
          sizes='1080, 560'
          placeholder='blur'
          blurDataURL={blurDataURL}
          className={`rounded object-cover object-top hover:scale-110 transition-all ${
            product.stockStatus === 'in-stock'
              ? 'grayscale-0'
              : 'grayscale opacity-50'
          }`}
        />
        {product.promo?.promoOn ? (
          <p className='absolute top-3 right-3 bg-[#333333] text-white py-2 px-4 text-xs font-bold rounded tracking-wider'>
            {getPercentageDecrease(product.promo.promoPrice, product.price)}%
          </p>
        ) : null}
        {product.stockStatus !== 'in-stock' ? (
          <p className='absolute top-3 left-3 bg-red-600 text-white uppercase py-2 px-4 text-xs font-bold rounded tracking-wider'>
            Out of stock
          </p>
        ) : null}
      </div>
      <div className='text-center'>
        <p className='pt-5 font-bold uppercase tracking-[2px] text-[#333333] group-hover:text-blue-700 text-xs md:tracking-[4px]'>
          {product.name}
        </p>
        <div className='flex items-center justify-center gap-3 pt-1'>
          <p
            className={`text-xs text-[#8c8c8c] ${
              product.promo?.promoOn ? 'line-through' : 'no-underline'
            }`}>
            {formatCurrency(product.price)}
          </p>
          {product.promo?.promoOn ? (
            <p className='text-xs text-[#8c8c8c] font-bold'>
              {formatCurrency(product.promo.promoPrice)}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
