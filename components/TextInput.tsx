import { InformationCircleIcon } from '@heroicons/react/20/solid'
import {
  Control,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
  UseFormRegister,
  useController,
} from 'react-hook-form'
import { Select } from './Select'

interface TextInputProps<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<'input'> {
  label: React.ReactNode
  type: string
  name: Path<UnPackAsyncDefaultValues<T>>
  className?: string
  register: UseFormRegister<T>
  control: Control<T>
  data?: string[]
  // prefixIcon?: React.ReactNode
}

export const TextInput = <T extends FieldValues>({
  label,
  name,
  type,
  className,
  register,
  control,
  data,
  ...inputProps
}: TextInputProps<T>) => {
  const {
    fieldState: { error },
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules: {
      required: type === 'textarea' ? false : true,
      pattern:
        type === 'email'
          ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
          : undefined,
    },
  })

  return (
    <div className={`flex w-full flex-col pt-4 ${className}`}>
      <label htmlFor={name} className='text-sm capitalize'>
        {label}
      </label>
      {type === 'select' ? (
        <Select
          data={data as string[]}
          selected={value}
          setSelected={onChange}
          className={`mt-1 w-full flex-1 appearance-none rounded !p-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
            error ? 'ring-2 ring-red-600' : 'ring-gray-300'
          }`}
        />
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          rows={3}
          className={`mt-1 w-full flex-1 resize-none appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
            error ? 'ring-2 ring-red-600' : 'ring-gray-300'
          }`}
          placeholder='Special instructions for seller'
          {...register(name)}
        />
      ) : (
        <input
          type={type ?? 'text'}
          {...register(name)}
          {...inputProps}
          id={name}
          className={`mt-1 w-full flex-1 appearance-none rounded px-3 py-3 text-sm text-gray-700 ring-1 focus:border-none focus:outline-none focus:ring-2 focus:ring-main ${
            error ? 'ring-2 ring-red-600' : 'ring-gray-300'
          }`}
        />
      )}

      {error ? (
        <span className='flex items-center gap-1 pt-[6px] text-xs text-red-600'>
          <InformationCircleIcon className='h-4 w-4' />
          {error.type === 'required'
            ? `${label} is required`
            : 'Invalid email address'}
        </span>
      ) : null}
    </div>
  )
}
