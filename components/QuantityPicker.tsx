import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

export const QuantityPicker = () => {
  return (
    <div className='flex items-center gap-3 bg-gray-100 text-sm '>
      <button
        title='increase quantity'
        aria-label='increase quantity'
        className='bg-gray-200 px-2 py-2'>
        <PlusIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
      </button>
      <p className='font-black'>1</p>
      <button
        title='decrease quantity'
        aria-label='decrease quantity'
        className='bg-gray-200 px-2 py-2'>
        <MinusIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
      </button>
    </div>
  )
}
