import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onclick?: () => void
  children: ReactNode
  extraStyling?: string
}

export default function Button({
  onclick,
  children,
  extraStyling,
  className,
  ...rest
}: IButtonProps) {
  return (
    <button
      onClick={onclick}
      className={twMerge(
        `h-10 w-full max-w-[12.5rem] rounded bg-gradient py-1 uppercase leading-relaxed text-white transition-all hover:bg-gray-900 hover:opacity-75 focus:ring-2 ${extraStyling}`,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
