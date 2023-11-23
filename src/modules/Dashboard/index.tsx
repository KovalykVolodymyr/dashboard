import { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import getUsers from 'services/getUsers'
import UserFilters from 'components/UserFilters'
import ResponsiveTable from 'components/ResponsiveTable'
import { Row } from 'components/ResponsiveTable/types'
import { User } from 'types/user'
import { getUserId } from 'utils'
import styles from './styles.module.scss'

const PAGE_SIZE = 50

const Dashboard: FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [rows, setRows] = useState<Row[]>([])
  const [allUsersNumber, setAllUsersNumber] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleUsertsToColumns = useCallback((usersData: User[]): Row[] => {
    const userRows: Row[] = []

    usersData.forEach(({ avatar, firstName, lastName, email }) => {
      const row: Row = {
        columns: [
          {
            key: 'avatar',
            value: avatar || ''
          },
          {
            key: 'name',
            value: `${firstName} ${lastName}`
          },
          {
            key: 'email',
            value: email
          }
        ],
        callback: () => {
          const userId = getUserId(email)
          navigate(`/users/${userId}`)
        }
      }

      userRows.push(row)
    })

    return userRows
  }, [])

  const handleFilterUsers = (filteredUsers: User[]) => {
    const filteredRows = handleUsertsToColumns(filteredUsers)
    setRows(filteredRows)
  }

  const handleLoadMore = async () => {
    if (loading) return

    setLoading(true)

    try {
      const nextPage = currentPage + 1
      const startIndex = (nextPage - 1) * PAGE_SIZE
      const endIndex = nextPage * PAGE_SIZE

      const newUsers = await getUsers(startIndex, endIndex)

      if (newUsers) {
        const updatedRows = [...rows, ...handleUsertsToColumns(newUsers.data)]
        setRows(updatedRows)
        setCurrentPage(nextPage)
        setUsers([...users, ...newUsers.data])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers(0, PAGE_SIZE)

      if (usersData) {
        const userstTable = handleUsertsToColumns(usersData.data)
        setRows(userstTable)
        setUsers(usersData.data)
        setAllUsersNumber(usersData.lengthAll)
      } else {
        toast.error("Sorry can't find Users", {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
    fetchUsers()
  }, [handleUsertsToColumns])

  return (
    <section className={styles.Dashboard}>
      <UserFilters users={users} filter={handleFilterUsers} />
      <hr />
      <ResponsiveTable headers={['Avatar', 'Name', 'Email']} rows={rows} />
      {users.length !== allUsersNumber ? (
        <div className={styles.ContainerBtn}>
          <button onClick={handleLoadMore} disabled={loading} className={styles.LoadMoreBtn}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      ) : null}
    </section>
  )
}

export default Dashboard
