/* eslint-disable @next/next/no-img-element */
import React from 'react'

import styles from './index.module.scss'

const LoadingSpinner = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.inside}>
        <img src="/loading.svg" width="100%" alt="" />
      </div>
    </div>
  )
}

export default LoadingSpinner
