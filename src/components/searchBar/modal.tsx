import React from 'react'
import Drawer from 'react-modern-drawer'
import Button from '../button'

import styles from './modal.module.scss'

type FilterModalProps = {
  open: boolean
  onClose: () => void
}

const FilterModal = (props: FilterModalProps) => {
  const { open, onClose } = props

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
        <Button type="submit">Search</Button>
      </div>
    </Drawer>
  )
}

export default FilterModal
