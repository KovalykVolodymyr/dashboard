export interface Props extends React.ComponentProps<'div'> {
  layout?: 'rect' | 'circle'
  type?: 'inline' | 'block'
  width?: string | number
  height?: string | number
  spaceTop?: string | number
  spaceBottom?: string | number
  spaceLeft?: string | number
  spaceRight?: string | number
  as?: string
  animation?: 'pulse' | 'wave' | 'none'
  withBasis?: boolean
}
