import React from 'react'

import Image from 'next/image'
import classnames from 'classnames'

import styles from './index.module.scss'

type CheckBoxProps = {
  isSelected: boolean
  onSelect: (newValue: boolean) => void
  label?: string
  className?: string
}

const CheckBox = (props: CheckBoxProps) => {
  const { onSelect, label, isSelected, className } = props

  const onClickHandler = () => {
    onSelect(!isSelected)
  }

  return (
    <div
      className={classnames(styles.root, className)}
      onClick={onClickHandler}
    >
      <div className={styles.box}>
        {isSelected && <Image src="/check.svg" fill alt="" />}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}

export default CheckBox
