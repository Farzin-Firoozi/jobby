import Image from 'next/image'
import React from 'react'

import styles from './index.module.scss'

const LoadingSpinner = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.inside}>
        <Image src="/loading.svg" fill alt="" />
      </div>
    </div>
  )
}

export default LoadingSpinner
