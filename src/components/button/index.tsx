import React from 'react'

import styles from './index.module.scss'
import classnames from 'classnames'
import LoadingSpinner from '../loading'
import { useRouter } from 'next/router'

type ButtonProps = {
  className?: string
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
  href?: string
} & React.PropsWithChildren

const Button = (props: ButtonProps) => {
  const {
    children = null,
    onClick = () => {},
    className = '',
    loading = false,
    type = 'button',
    href,
  } = props

  const router = useRouter()

  const onClickHandler = () => {
    if (loading) {
      return
    }
    if (href) {
      router.push(href)
    } else {
      onClick()
    }
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
