import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dispatch, Fragment, SetStateAction } from 'react'

type SelectProps<T> = {
  data: Array<T>
  className?: string
  setSelected: Dispatch<SetStateAction<T>>
  selected: T
}

export const Select = <T extends string | number>({
  data,
  className,
  selected,
  setSelected,
}: SelectProps<T>) => {
  return (
    <div className=''>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative'>
          <Listbox.Button
            className={`relative cursor-pointer bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-main focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:text-sm ${className}`}>
            <span className='block truncate'>{selected}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Listbox.Options className='absolute z-50 max-h-60 w-full overflow-auto rounded bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {data?.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative mx-1 cursor-default select-none rounded py-2 pl-5 ${
                      active ? 'bg-main text-white' : 'text-gray-700'
                    }`
                  }
                  value={person}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {person}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
