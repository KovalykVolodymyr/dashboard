import { FC, useMemo } from 'react'

import { User } from 'types/user'
import { ReactComponent as FilterIcon } from 'assets/icons/filter.svg'
import { Filter, Props } from './types'
import styles from './styles.module.scss'

const UserFilters: FC<Props> = ({ users, filter }) => {
  const genders = useMemo<string[]>(() => {
    const allGenders = users.map(({ gender }) => gender)
    return Array.from(new Set(allGenders))
  }, [users])

  const countries = useMemo<string[]>(() => {
    const allCountries = users.map(({ country }) => country)
    return Array.from(new Set(allCountries))
  }, [users])

  const cities = useMemo<string[]>(() => {
    const allCountries = users.map(({ city }) => city)
    return Array.from(new Set(allCountries))
  }, [users])

  const filters: Filter[] = [
    {
      key: 'gender',
      header: 'Gender',
      options: genders
    },
    {
      key: 'country',
      header: 'Country',
      options: countries
    },
    {
      key: 'city',
      header: 'City',
      options: cities
    }
  ]

  const handleFilter = (key: keyof User) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    if (value === 'all') {
      filter(users)
    } else {
      const filteredUsers = users.filter(user => user[key] === value)
      filter(filteredUsers)
    }
  }

  return (
    <section className={styles.UserFilters}>
      <div className={styles.Filters}>
        <div className={styles.FilterIcon}>
          <FilterIcon />
        </div>

        {filters.map(({ key, header, options }) => (
          <div key={key} className={styles.Filter}>
            <select id={key} name={key} defaultValue="all" onChange={handleFilter(key)}>
              <option value="all">{header}</option>
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </section>
  )
}

export default UserFilters
