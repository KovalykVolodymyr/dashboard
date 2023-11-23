import { HTMLAttributes } from 'react'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  size?: number
  backgroundColor?: string
}
