import { FC, useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { formatCurrency, getUserEmailFromId, timestampToDateTime } from 'utils'
import UserCard from 'components/UserCard'
import ResponsiveTable from 'components/ResponsiveTable'
import Skeleton from 'components/Skeleton'
import { Row } from 'components/ResponsiveTable/types'
import { User } from 'types/user'
import { Order } from 'types/order'
import getUser from 'services/getUser'
import getOrders from 'services/getOrders'
import styles from './styles.module.scss'

const PAGE_SIZE = 20

const UserDetails: FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [orders, setOrders] = useState<Order[]>([])
  const [allOrdersNumber, setAllOrdersNumber] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<Row[]>([])
  const { userId } = useParams()
  const navigate = useNavigate()

  const handleOrdersToColumns = useCallback((ordersData: Order[]): Row[] => {
    const userRows: Row[] = []

    ordersData.forEach(({ number, itemName, amount, price, currency, createdAt, shippedAt }) => {
      const row: Row = {
        columns: [
          {
            key: 'number',
            value: String(number)
          },
          {
            key: 'name',
            value: itemName
          },
          {
            key: 'amount',
            value: `x${amount}`
          },
          {
            key: 'price',
            value: `${currency} ${formatCurrency(price, currency)}`
          },
          {
            key: 'total',
            value: `${currency} ${formatCurrency(price * amount)}`
          },
          {
            key: 'date',
            value: timestampToDateTime(createdAt)
          },
          {
            key: 'shipped',
            value: timestampToDateTime(shippedAt)
          }
        ]
      }

      userRows.push(row)
    })

    return userRows
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const userEmail = getUserEmailFromId(userId || '')
      const userData = await getUser(userEmail)

      if (userData) {
        setUser(userData)
      } else {
        toast.error("Sorry can't find info about  User", {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
    fetchUser()
  }, [userId])

  const handleLoadMore = async () => {
    if (loading) return

    setLoading(true)

    try {
      const nextPage = currentPage + 1
      const startIndex = (nextPage - 1) * PAGE_SIZE
      const endIndex = nextPage * PAGE_SIZE

      const newUsers = await getOrders(startIndex, endIndex)

      if (newUsers) {
        const updatedRows = [...rows, ...handleOrdersToColumns(newUsers.data)]
        setRows(updatedRows)
        setCurrentPage(nextPage)
        setOrders([...orders, ...newUsers.data])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getOrders(0, PAGE_SIZE)

      if (ordersData) {
        const userstTable = handleOrdersToColumns(ordersData.data)
        setRows(userstTable)
        setOrders(ordersData.data)
        setAllOrdersNumber(ordersData.lengthAll)
      } else {
        toast.error("Sorry can't find Orders", {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
    fetchOrders()
  }, [handleOrdersToColumns])

  return user ? (
    <section className={styles.UserDetails}>
      <button onClick={() => navigate(-1)} className={styles.GoBack}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </button>
      <UserCard user={user} />
      <ResponsiveTable
        headers={['#', 'Name', 'Amount', 'Price', 'Total Price', 'Ordered', 'Shipped']}
        rows={rows}
      />
      {orders.length !== allOrdersNumber ? (
        <div className={styles.ContainerBtn}>
          <button onClick={handleLoadMore} disabled={loading} className={styles.LoadMoreBtn}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      ) : null}
    </section>
  ) : (
    <section className={styles.UserDetails}>
      <Skeleton
        width="100%"
        height={300}
        animation="wave"
        type="block"
        layout="rect"
        spaceBottom={16}
      />

      <Skeleton
        width="100%"
        height={530}
        animation="wave"
        type="block"
        layout="rect"
        spaceBottom={16}
      />
    </section>
  )
}

export default UserDetails
