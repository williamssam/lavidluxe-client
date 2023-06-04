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
import { formatCurrency } from 'utils/functions/formatCurrency'
import { QuantityPicker } from './QuantityPicker'

export const Cart = () => {
  const [openCart, setOpenCart] = useAtom(openCartDrawer)

  const cart = useCartStore(state => state.cart)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const increaseQuantity = useCartStore(state => state.increaseQuantity)
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity)
  const clearCart = useCartStore(state => state.clearCart)
  const { subtotal } = useCart(cart)

  const { parent } = useAnimate()

  return (
    <section
      className={`absolute right-0 top-0 h-screen w-80 overflow-auto border-l bg-gray-50 py-10 px-5 transition-all will-change-transform md:w-96 md:p-10 ${
        openCart ? 'translate-x-0' : '-translate-x-full'
      }`}>
      <header className='flex items-center'>
        <h3 className='text-lg font-bold uppercase tracking-[4px] text-[#333333] lg:tracking-[6px]'>
          Shopping Cart
        </h3>

        <button
          type='button'
          onClick={() => setOpenCart(!openCart)}
          className='absolute right-3 flex items-center justify-center rounded p-[0.2rem] text-gray-500 transition-all hover:bg-main hover:text-gray-100 active:scale-95'>
          <XMarkIcon className='h-6 w-6' />
        </button>
      </header>

      {/* cart items */}
      <ul className='flex flex-col gap-10 pt-16' ref={parent}>
        {cart.length > 0 ? (
          cart?.map(product => (
            <li
              key={product?.name}
              className='flex items-center gap-5 border-b border-dashed pb-5'>
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={80}
                className='h-20 w-16 rounded object-cover'
              />
              <div className='w-full text-xs font-bold'>
                <div className='flex items-start justify-between gap-2'>
                  <div>
                    <h4 className='uppercase tracking-[4px] text-[#333333]'>
                      {product?.name}
                    </h4>
                    <p className='flex items-center gap-3 pt-1 capitalize text-[#999999]'>
                      {product?.size ? <span>Size: {product.size}</span> : null}
                      {product?.color ? (
                        <span>Color: {product.color}</span>
                      ) : null}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    type='button'
                    title='Delete item'
                    className='flex h-6 w-6 items-center justify-center rounded-sm bg-red-100 text-red-400 transition-all hover:bg-red-200 hover:text-red-600 active:scale-95'>
                    <TrashIcon className='h-3 w-3' aria-hidden='true' />
                  </button>
                </div>

                <div className='flex items-center justify-between pt-2'>
                  <QuantityPicker
                    quantity={product.quantity}
                    onIncrease={() => increaseQuantity(product.id)}
                    onDecrease={() => decreaseQuantity(product.id)}
                  />

                  <p className='text-sm font-bold text-[#333333]'>
                    {formatCurrency(product.price * product.quantity)}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className='flex flex-col items-center justify-center bg-gray-200 py-8 px-4'>
            <ShoppingCartIcon className='h-10 w-10 text-main' />
            <p className='pt-4 font-vollkorn font-bold uppercase tracking-wider'>
              Your cart is empty
            </p>
            <p className='text-xs text-gray-400'>Add items to your cart</p>
          </li>
        )}
      </ul>

      {cart.length > 0 ? (
        <div className='flex items-center justify-between pt-14'>
          <h4 className='text-[0.85rem] font-bold uppercase tracking-[5px] text-gray-700'>
            Subtotal
          </h4>
          <p className='text-base font-bold text-gray-800'>
            {formatCurrency(subtotal)}
          </p>
        </div>
      ) : null}
      <p className='pt-1 text-xs font-medium'>
        <strong>Note:</strong> Taxes and shipping calculated at checkout
      </p>

      {cart.length > 0 ? (
        <Link
          href='/checkout/information'
          className='mt-10 flex w-full justify-center rounded bg-[#333333] py-4 px-10 text-xs font-bold uppercase tracking-[5px] text-white transition-all hover:border-main hover:bg-main active:scale-95'>
          Checkout
        </Link>
      ) : null}
      {cart.length > 0 ? (
        <button
          type='button'
          onClick={clearCart}
          className='mt-5 flex w-full justify-center rounded text-xs font-bold uppercase tracking-widest text-[#333333] transition-all hover:text-main active:scale-95'>
          Clear cart
        </button>
      ) : null}
    </section>
  )
}
