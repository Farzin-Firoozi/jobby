import React from 'react'

import styles from './index.module.scss'
import classnames from 'classnames'
import LoadingSpinner from '../loading'

type ButtonProps = {
  className?: string
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
} & React.PropsWithChildren

const Button = (props: ButtonProps) => {
  const {
    children = null,
    onClick = () => {},
    className = '',
    loading = false,
    type = 'button',
  } = props

  const onClickHandler = () => {
    if (loading) {
      return
    }
    onClick()
  }

  return (
    <button
      className={classnames(styles.root, className)}
      onClick={onClickHandler}
      type={type}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  )
}

export default Button
