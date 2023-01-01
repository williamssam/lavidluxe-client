import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

type QuantityPickerProps = {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export const QuantityPicker = ({
  onIncrease,
  onDecrease,
  quantity,
}: QuantityPickerProps) => {
  return (
    <div className='flex items-center gap-3 bg-gray-100 text-sm rounded'>
      <button
        title='decrease quantity'
        onClick={onDecrease}
        aria-label='decrease quantity'
        className='bg-gray-200 px-2 py-2 rounded'>
        <MinusIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
      </button>
      <p className='font-black'>{quantity}</p>
      <button
        title='increase quantity'
        onClick={onIncrease}
        aria-label='increase quantity'
        className='bg-gray-200 px-2 py-2 rounded'>
        <PlusIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
      </button>
    </div>
  )
}
