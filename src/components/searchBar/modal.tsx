/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import React from 'react'
import Drawer from 'react-modern-drawer'
import Button from '../button'
import CheckBox from '../checkBox'

import styles from './modal.module.scss'

type FilterModalProps = {
  open: boolean
  onClose: () => void
  location: string
  fullTimeOnly: boolean
  setFullTimeOnly: (value: boolean) => void
  setLocation: (value: string) => void
}

const FilterModal = (props: FilterModalProps) => {
  const {
    open,
    onClose,
    setLocation,
    location,
    fullTimeOnly,
    setFullTimeOnly,
  } = props

  return (
    <Drawer
      direction="bottom"
      open={open}
      onClose={onClose}
      className={styles.root}
      size="100%"
    >
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.card}>
        <div className={classNames(styles.section, styles.borderBottom)}>
          <img
            src="/location-primary.svg"
            alt="Search"
            width={24}
            height={24}
            className={styles.icon}
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Filter by location..."
            className={styles.input}
          />
        </div>
        <div className={styles.section}>
          <CheckBox
            className={styles.checkBox}
            isSelected={fullTimeOnly}
            onSelect={setFullTimeOnly}
            label="Full Time Only"
          />
        </div>
        <div className={styles.section}>
          <Button type="submit">Search</Button>
        </div>
      </div>
    </Drawer>
  )
}

export default FilterModal
