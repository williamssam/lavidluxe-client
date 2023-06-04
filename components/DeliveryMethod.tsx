import { RadioGroup } from '@headlessui/react'
import {
  BuildingStorefrontIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  TruckIcon,
} from '@heroicons/react/20/solid'
import {
  Control,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
  useController,
} from 'react-hook-form'

const deliveryMethods = [
  {
    id: 1,
    name: 'Ship',
    description: 'Delivered within three to seven working days.',
    icon: <TruckIcon className='h-5 w-5' />,
  },
  {
    id: 2,
    name: 'Pick Up',
    description: 'Pick up your order from our store.',
    icon: <BuildingStorefrontIcon className='h-5 w-5' />,
  },
]

type DeliveryMethodProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<UnPackAsyncDefaultValues<T>>
}

export const DeliveryMethod = <T extends FieldValues>({
  control,
  name,
}: DeliveryMethodProps<T>) => {
  const {
    fieldState: { error },
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules: {
      required: true,
    },
  })

  return (
    <>
      <RadioGroup
        className='pt-4'
        value={value}
        onChange={onChange}
        aria-label='Delivery method'>
        <div className='flex w-full flex-col gap-2 lg:flex-row'>
          {deliveryMethods.map(method => (
            <RadioGroup.Option
              key={method.id}
              value={method.name.toLowerCase()}
              className={({ active, checked }) =>
                `${active ? 'ring-2 ring-dark' : 'ring-1 ring-gray-300'}
                  ${checked ? 'bg-main text-white ring-0' : 'bg-white'}
                    relative flex flex-1 cursor-pointer appearance-none rounded px-5 py-3 focus:outline-none`
              }>
              {({ checked }) => (
                <>
                  <div className='flex w-full items-center justify-between'>
                    <div>
                      <RadioGroup.Label
                        as='p'
                        className={`flex items-center gap-2 font-medium ${
                          checked ? 'text-white' : 'text-gray-900'
                        }`}>
                        {method.icon}
                        {method.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as='span'
                        className={`inline text-xs ${
                          checked ? 'text-sky-100' : 'text-gray-500'
                        }`}>
                        {method.description}
                      </RadioGroup.Description>
                    </div>

                    {checked && (
                      <div className='shrink-0 text-white'>
                        <CheckCircleIcon className='h-6 w-6' />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      {error ? (
        <span className='flex items-center gap-1 pt-[6px] text-xs text-red-600'>
          <InformationCircleIcon className='h-4 w-4' />
          Delivery method is required. Please select one.
        </span>
      ) : null}
    </>
  )
}
