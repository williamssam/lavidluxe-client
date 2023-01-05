import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import { useCart } from 'hooks/useCart'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useCartStore } from 'store/cartStore'
import { userInfo } from 'store/gloablAtom'
import { formatCurrency } from 'utils/formatCurrency'
import { Spinner } from './Spinner'

export const OrderInformation = () => {
  const cart = useCartStore(state => state.cart)
  const [info] = useAtom(userInfo)
  const { shippingCost, subtotal, total, vat } = useCart(cart)

  return (
    <section className='bg-gray-100 border-l h-full col-span-2 p-5 md:px-5 md:py-10 lg:px-10 lg:py-20 xl:p-20'>
      <ul className='border-b border-b-gray-300 pb-3'>
        {cart.length > 0 ? (
          cart?.map(product => (
            <li
              className='flex items-center gap-5 border-b border-dashed pb-5'
              key={product.id}>
              <Image
                src={product.image}
                width={64}
                height={100}
                alt={`${product.name}`}
                className='w-16 h-20 object-cover rounded'
              />
              <div className='text-xs font-bold w-full flex items-center justify-between'>
                <div>
                  <h4 className='uppercase tracking-[4px] text-[#333333]'>
                    {product.name}
                  </h4>
                  <p className='text-[#999999] capitalize pt-1'>
                    {product?.size ? `Size ${product.size}` : null}{' '}
                    {product?.color ? `/ ${product.color}` : null}
                  </p>

                  <p className='text-gray-500 pt-3'>
                    Quantity: {product.quantity}
                  </p>
                </div>

                <p className='text-sm font-bold text-gray-700'>
                  {formatCurrency(+product.price * product.quantity)}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li className='flex flex-col items-center justify-center bg-gray-100 py-8 px-4'>
            <ShoppingCartIcon className='w-10 h-10 text-main' />
            <p className='uppercase font-vollkorn font-bold tracking-wider pt-4'>
              Your cart is empty 😔
            </p>
            <p className='text-xs text-gray-400'>Add items to your cart</p>
          </li>
        )}
      </ul>

      <div className='border-b border-b-gray-300 py-5 flex flex-col gap-3'>
        <div className='flex items-center justify-between text-sm'>
          <p>Subtotal</p>
          <p className='text-gray-700 font-bold'>{formatCurrency(subtotal)}</p>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <p>Shipping</p>
          {info.state ? (
            <p className='text-gray-700 font-bold'>
              {formatCurrency(shippingCost)}
            </p>
          ) : (
            <p className='text-xs flex items-center'>
              <span>Calculating...</span>
              <Spinner />
            </p>
          )}
        </div>
        <div className='flex items-center justify-between text-sm'>
          <p>VAT (Value Added Tax - 5%)</p>
          <p className='text-gray-700 font-bold'>{formatCurrency(vat)}</p>
        </div>
      </div>

      <div className='flex items-center justify-between pt-6'>
        <p>Total</p>
        <p className='text-lg font-bold text-[#333333]'>
          {formatCurrency(total)}
        </p>
      </div>
    </section>
  )
}
