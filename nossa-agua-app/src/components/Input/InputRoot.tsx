
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface InputRootProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function InputRoot(props: InputRootProps) {
  const { register } = useFormContext()

  return (
    <input
      id={props.name}
      {...register(props.name)}
      {...props}
      className={twMerge(
        'w-full appearance-none rounded border border-zinc-300 px-5 py-2 text-black placeholder:text-gray-200 focus:border-blue focus:shadow-blue focus:outline-none ',
        props.className,
      )}
    />
  )
}
