import { FC, lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import DefaultLayout from 'layouts/DefaultLayout'
import Loader from 'components/Loader'

const Dashboard = lazy(() => import('modules/Dashboard'))
const NotFound = lazy(() => import('modules/NotFound'))
const UserDetails = lazy(() => import('modules/UserDetails'))

const Router: FC = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/:userId" element={<UserDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </DefaultLayout>
  </BrowserRouter>
)

export default Router
