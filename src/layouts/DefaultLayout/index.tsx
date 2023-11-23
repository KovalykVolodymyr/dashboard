import { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from 'components/Sidebar'
import { Props } from './types'

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main id="layout-shift">
        <section id="wrapper">{children}</section>
      </main>
      <ToastContainer />
    </>
  )
}

export default DefaultLayout
