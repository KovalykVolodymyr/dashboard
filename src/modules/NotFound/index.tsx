import { FC } from 'react'

import styles from './styles.module.scss'

const NotFound: FC = () => {
  return (
    <div className={`full-height-page ${styles.NotFound}`}>
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
  )
}

export default NotFound
