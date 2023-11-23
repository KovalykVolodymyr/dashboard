import { FC, createElement } from 'react'
import { Props } from './types'
import styles from './styles.module.scss'

const Skeleton: FC<Props> = ({
  layout,
  type,
  width,
  height,
  spaceTop,
  spaceBottom,
  spaceLeft,
  spaceRight,
  as,
  animation,
  withBasis,
  className,
  style,
  ...props
}) => {
  return createElement(
    as || 'span',
    {
      ...props,
      className: [
        styles.Skeleton,
        ...(type === 'block' ? [styles.Block] : []),
        ...(type === 'inline' ? [styles.Inline] : []),
        ...(layout === 'rect' ? [styles.Rect] : []),
        ...(layout === 'circle' ? [styles.Circle] : []),
        ...(animation === 'pulse' ? [styles.Pulse] : []),
        ...(animation === 'wave' ? [styles.Wave] : []),
        className || ''
      ].join(' '),
      style: {
        ...(style || {}),
        ...(withBasis ? { flexBasis: width } : {}),
        maxWidth: width,
        height,
        marginTop: spaceTop,
        marginBottom: spaceBottom,
        marginLeft: spaceLeft,
        marginRight: spaceRight
      }
    },
    null
  )
}

export default Skeleton
