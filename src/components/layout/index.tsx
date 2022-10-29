import React from 'react'

import styles from './index.module.scss'

export const Layout = (props: React.PropsWithChildren) => {
  const { children } = props
  return <div className={styles.root}>{children}</div>
}
