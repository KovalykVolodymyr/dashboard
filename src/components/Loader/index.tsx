import Skeleton from 'components/Skeleton'
import { FC } from 'react'

const Loader: FC = () => {
  return (
    <Skeleton
      width="100%"
      height={500}
      animation="wave"
      type="block"
      layout="rect"
      spaceBottom={16}
    />
  )
}

export default Loader
