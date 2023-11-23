import { FC } from 'react'

import { ReactComponent as UserIcon } from 'assets/icons/user.svg'
import { Props } from './types'
import styles from './styles.module.scss'

const EmptyAvatar: FC<Props> = ({ size, backgroundColor, className, style, ...props }) => {
  return (
    <div
      className={`${styles.EmpyAvatar} ${className}`}
      style={{ ...(style || {}), backgroundColor, width: size || 30, height: size || 30 }}
      {...props}
    >
      <UserIcon width={(size || 30) * 0.48} />
    </div>
  )
}

export default EmptyAvatar
