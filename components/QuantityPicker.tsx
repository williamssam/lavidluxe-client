import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export const QuantityPicker = () => {
  const [productQuantity, setProductQuantity] = useState(1)

  const increaseProductQuantity = () => setProductQuantity(productQuantity + 1)
  const decreaseProductQuantity = () => {
    if (productQuantity === 1) return
    setProductQuantity(productQuantity - 1)
  }

  return (
    <div className='flex items-center gap-3 bg-gray-100 text-sm rounded'>
      <button
        title='decrease quantity'
        onClick={decreaseProductQuantity}
        aria-label='decrease quantity'
        className='bg-gray-200 px-2 py-2 rounded'>
        <MinusIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
      </button>
      <p className='font-black'>{productQuantity}</p>
      <button
        title='increase quantity'
        onClick={increaseProductQuantity}
        aria-label='increase quantity'
        className='bg-gray-200 px-2 py-2 rounded'>
        <PlusIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
      </button>
    </div>
  )
}
