import { InformationCircleIcon } from '@heroicons/react/20/solid'

type AlertProps = {
  variants: 'success' | 'error' | 'warning' | 'info' | 'default'
}

const variantStyles = {
  success: 'bg-green-100 border-x-green-600',
  error: 'bg-red-100 border-x-red-600',
  warning: 'bg-yellow-100 border-x-yellow-600',
  info: 'bg-blue-100 border-x-blue-600',
  default: 'bg-gray-100 border-x-gray-600',
}

export const Alert = ({ variants }: AlertProps) => {
  return (
    <div
      className={`mx-auto flex max-w-[65ch] items-center gap-3 rounded border-x-4 py-2 px-2 ${variantStyles[variants]}`}>
      <div className='grid h-8 w-8 place-items-center rounded-full bg-green-600 text-white'>
        <InformationCircleIcon className='h-5 w-5' />
      </div>
      <p className='text-sm text-gray-700'>
        Your wishlists are stored in your current device. You can send them to
        your mail
      </p>
    </div>
  )
}
