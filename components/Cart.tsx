import {
  ShoppingCartIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { useAnimate } from 'hooks/useAnimate'
import { useCart } from 'hooks/useCart'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { openCartDrawer } from 'store/atoms'
import { useCartStore } from 'store/cartStore'
import { formatCurrency } from 'utils/formatCurrency'
import { QuantityPicker } from './QuantityPicker'

type CartProps = {
  // openCartDrawer: boolean
}

export const Cart = ({}: CartProps) => {
  const [openCart, setOpenCart] = useAtom(openCartDrawer)

  const cart = useCartStore(state => state.cart)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const increaseQuantity = useCartStore(state => state.increaseQuantity)
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity)
  const clearCart = useCartStore(state => state.clearCart)
  const { subtotal } = useCart(cart)

  // console.log('cart', cart)

  const { parent } = useAnimate()

  return (
    <section
      className={`w-80 md:w-96 border-l bg-gray-50 absolute right-0 top-0 h-screen py-10 px-5 md:p-10 transition-all will-change-transform overflow-auto ${
        openCart ? 'translate-x-0' : '-translate-x-full'
      }`}>
      <header className='flex items-center'>
        <h3 className='text-lg uppercase tracking-[4px] lg:tracking-[6px] font-bold text-[#333333]'>
          Shopping Cart
        </h3>

        <button
          type='button'
          onClick={() => setOpenCart(!openCart)}
          className='flex items-center justify-center text-gray-500 p-[0.2rem] hover:bg-main rounded active:scale-95 hover:text-gray-100 transition-all absolute right-3'>
          <XMarkIcon className='w-6 h-6' />
        </button>
      </header>

      {/* cart items */}
      <ul className='pt-16 flex flex-col gap-10' ref={parent}>
        {cart.length > 0 ? (
          cart?.map(product => (
            <li
              key={product?.name}
              className='flex items-center gap-5 border-b border-dashed pb-5'>
              <Image
                src={product.image}
                alt={`${product.name}`}
                width={64}
                height={80}
                className='w-16 h-20 object-cover rounded'
              />
              <div className='text-xs font-bold w-full'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h4 className='uppercase tracking-[4px] text-[#333333]'>
                      {product?.name}
                    </h4>
                    <p className='text-[#999999] capitalize pt-1'>
                      {product?.size ? `Size ${product.size}` : null}{' '}
                      {product?.color !== 'Select'
                        ? `/ ${product.color}`
                        : null}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    type='button'
                    title='Delete item'
                    className='w-6 h-6 rounded-sm flex items-center justify-center text-red-400 bg-red-100 hover:bg-red-200 hover:text-red-600 transition-all active:scale-95'>
                    <TrashIcon className='h-3 w-3' aria-hidden='true' />
                  </button>
                </div>

                <div className='pt-2 flex items-center justify-between'>
                  <QuantityPicker
                    quantity={product.quantity}
                    onIncrease={() => increaseQuantity(product.id)}
                    onDecrease={() => decreaseQuantity(product.id)}
                  />

                  <p className='text-sm font-bold text-[#333333]'>
                    {formatCurrency(+product.price * product.quantity)}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className='flex flex-col items-center justify-center bg-gray-100 py-8 px-4'>
            <ShoppingCartIcon className='w-10 h-10 text-main' />
            <p className='uppercase font-vollkorn font-bold tracking-wider pt-4'>
              Your cart is empty
            </p>
            <p className='text-xs text-gray-400'>Add items to your cart</p>
          </li>
        )}
      </ul>

      {cart.length > 0 ? (
        <div className='flex items-center justify-between pt-14'>
          <h4 className='uppercase text-[0.85rem] tracking-[5px] font-bold text-gray-700'>
            Subtotal
          </h4>
          <p className='text-base font-bold text-gray-800'>
            {formatCurrency(subtotal)}
          </p>
        </div>
      ) : null}

      {cart.length > 0 ? (
        <Link
          href='/checkout/information'
          className='w-full rounded flex justify-center bg-[#333333] text-white py-4 px-10 text-xs font-bold uppercase tracking-[5px] transition-all hover:border-main hover:bg-main active:scale-95 mt-10'>
          Checkout
        </Link>
      ) : null}
      {cart.length > 0 ? (
        <button
          type='button'
          onClick={clearCart}
          className='w-full rounded flex justify-center text-[#333333] text-xs font-bold uppercase tracking-[5px] transition-all hover:text-main active:scale-95 mt-5'>
          Clear cart
        </button>
      ) : null}
    </section>
  )
}
