import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import EmptyAvatar from 'components/EmpyAvatar'
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg'
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { ReactComponent as ShieldIcon } from 'assets/icons/shield.svg'
import { ReactComponent as ChartIcon } from 'assets/icons/chart.svg'
import { ReactComponent as LayerIcon } from 'assets/icons/layer.svg'
import { ReactComponent as FlagIcon } from 'assets/icons/flag.svg'
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg'
import styles from './styles.module.scss'

const DUMMY_LINKS = [ShieldIcon, ChartIcon, LayerIcon, FlagIcon, SettingsIcon]

const Sidebar: FC = () => {
  return (
    <aside className={styles.Sidebar}>
      <div className={styles.Logo}>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.Active : '')}>
          <LogoIcon />
        </NavLink>
      </div>

      <ul className={styles.Nav}>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.Active : '')}>
            <HomeIcon />
          </NavLink>
        </li>

        {DUMMY_LINKS.map((Icon, index) => (
          <li key={index}>
            <NavLink to="#">
              <Icon />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.User}>
        <NavLink to="#">
          <EmptyAvatar size={48} backgroundColor="#e45548" />
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
