import { FC } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

import EmptyAvatar from 'components/EmpyAvatar'
import { Props } from './types'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import styles from './styles.module.scss'

const ResponsiveTable: FC<Props> = ({ headers, rows }) => {
  return (
    <section className={styles.ResponsiveTable}>
      <Table>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {rows.map(({ columns, callback }, index) => (
            <Tr key={index} className={callback ? styles.Active : ''} onClick={callback}>
              {columns.map(({ key, value }, idx) => (
                <Td key={`${index}-${idx}`} data-key={key}>
                  {key === 'avatar' ? (
                    value ? (
                      <img src={value} alt="avatar" />
                    ) : (
                      <EmptyAvatar size={30} />
                    )
                  ) : (
                    value
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </section>
  )
}

export default ResponsiveTable
