import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import { useCart } from 'hooks/useCart'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCartStore } from 'store/cartStore'
import { formatCurrency } from 'utils/functions/formatCurrency'

export const OrderInformation = () => {
  const router = useRouter()
  const cart = useCartStore(state => state.cart)
  const { shippingCost, subtotal, total, vat } = useCart(cart)

  return (
    <section className='order-1 col-span-2 h-full border-l bg-gray-100 p-5 md:order-2 md:px-5 md:py-10 lg:px-10 lg:py-20 xl:p-20'>
      <h3 className='pb-4 text-xs font-bold uppercase tracking-[4px] text-gray-700 md:hidden'>
        Order Summary
      </h3>
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
                className='h-20 w-16 rounded object-cover'
              />
              <div className='flex w-full items-center justify-between text-xs font-bold'>
                <div>
                  <h4 className='uppercase tracking-[4px] text-[#333333]'>
                    {product.name}
                  </h4>
                  <p className='flex items-center gap-3 pt-1 capitalize text-[#999999]'>
                    {product?.size ? <span>Size: {product.size}</span> : null}
                    {product?.color ? (
                      <span>Color: {product.color}</span>
                    ) : null}
                  </p>

                  <p className='pt-3 text-gray-500'>
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
            <ShoppingCartIcon className='h-10 w-10 text-main' />
            <p className='pt-4 font-vollkorn font-bold uppercase tracking-wider'>
              Your cart is empty 😔
            </p>
            <p className='text-xs text-gray-400'>Add items to your cart</p>
          </li>
        )}
      </ul>

      <div className='flex flex-col gap-3 border-b border-b-gray-300 py-5'>
        <div className='flex items-center justify-between text-sm'>
          <p>Subtotal</p>
          <p className='font-bold text-gray-700'>{formatCurrency(subtotal)}</p>
        </div>
        {router.pathname.includes('payment') ? (
          <div className='flex items-center justify-between text-sm'>
            <p>Shipping</p>
            <p className='font-bold text-gray-700'>
              {formatCurrency(shippingCost)}
            </p>
          </div>
        ) : null}
        <div className='flex items-center justify-between text-sm'>
          <p>VAT (Value Added Tax)</p>
          <p className='font-bold text-gray-700'>{formatCurrency(vat)}</p>
        </div>
      </div>

      <div className='flex items-center justify-between pt-6'>
        <p className='font-bold text-[#333333]'>Total</p>
        <p className='text-lg font-bold text-[#333333]'>
          {formatCurrency(total)}
        </p>
      </div>
    </section>
  )
}
