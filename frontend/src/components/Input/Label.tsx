import { LabelHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={twMerge('mt-4', props.className)} {...props} />
}
