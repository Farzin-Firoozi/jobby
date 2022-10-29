import Image from 'next/image'
import React from 'react'
import Moment from 'react-moment'

import styles from './index.module.scss'

export type JobItem = {
  id: number
  company: string
  logo: string
  logoBackground: string
  position: string
  postedAt: string
  contract: string
  location: string
}

const JobCard = ({ item }: { item: JobItem }) => {
  return (
    <div className={styles.root}>
      <div
        className={styles.iconWrapper}
        style={{ backgroundColor: item.logoBackground }}
      >
        <Image
          src={item.logo}
          alt={item.company}
          fill
          className={styles.icon}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <span>
            <Moment date={item.postedAt} fromNow />
          </span>
          <span className={styles.dot} />
          <span>{item.contract}</span>
        </div>

        <h2>{item.position}</h2>

        <div className={styles.info}>{item.company}</div>

        <div className={styles.location}>{item.location}</div>
      </div>
    </div>
  )
}

export default JobCard
