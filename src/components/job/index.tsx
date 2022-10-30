/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
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
    <Link href={`/${item.id}`}>
      <section className={styles.root}>
        <div
          className={styles.iconWrapper}
          style={{ backgroundColor: item.logoBackground }}
        >
          <img src={item.logo} alt={item.company} width="100%" />
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
      </section>
    </Link>
  )
}

export default JobCard
