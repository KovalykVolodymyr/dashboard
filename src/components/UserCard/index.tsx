import { FC } from 'react'

import EmptyAvatar from 'components/EmpyAvatar'
import { Props } from './types'
import styles from './styles.module.scss'

const UserCard: FC<Props> = ({
  user: {
    avatar,
    firstName,
    lastName,
    email,
    streetNumber,
    street,
    city,
    postCode,
    state,
    country,
    gender
  }
}) => {
  return (
    <section className={styles.UserCard}>
      <div className={styles.LeftSide}>
        {avatar ? (
          <img src={avatar} alt="avatar" />
        ) : (
          <EmptyAvatar size={120} backgroundColor="#e45548" />
        )}
        <h2 className={styles.Name}>
          {firstName} {lastName}
        </h2>
        <h4 className={styles.Email}>{email}</h4>
      </div>

      <div className={styles.RightSide}>
        <div className={styles.InfoBox}>
          <h3 className={styles.Title}>Address</h3>
          <p className={styles.Info}>
            {streetNumber} {street}
          </p>
          <p className={styles.Info}>
            {city}, {postCode}, {state}, {country}
          </p>
        </div>

        <div className={styles.InfoBox}>
          <h3 className={styles.Title}>Gender</h3>
          <p className={styles.Info}>{gender}</p>
        </div>

        <div className={styles.InfoBox}>
          <h3 className={styles.Title}>Notes</h3>
          <p className={styles.Info}>None</p>
        </div>
      </div>
    </section>
  )
}

export default UserCard
