import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import classnames from 'classnames'

import styles from './index.module.scss'

import Button from '../button'
import CheckBox from '../checkBox'
import { useRouter } from 'next/router'

const SearchBar = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [fullTimeOnly, setFullTimeOnly] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    router.push({
      pathname: '/',
      query: { keyword, location, fullTimeOnly },
    })
  }

  useEffect(() => {
    setKeyword(router.query.keyword?.toString() || '')
    setLocation(router?.query?.location?.toString() || '')
    setFullTimeOnly(router?.query?.fullTimeOnly === 'true')

    if (loading) {
      setLoading(false)
    }
  }, [router.asPath])

  return (
    <form className={styles.root} onSubmit={onSubmit}>
      <div
        className={classnames(styles.section, styles.big, styles.borderRight)}
      >
        <Image
          src="/search-primary.svg"
          alt="Search"
          width={24}
          height={24}
          className={styles.icon}
        />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Filter by title, companies..."
          className={styles.input}
        />
      </div>

      <div
        className={classnames(styles.section, styles.small, styles.borderRight)}
      >
        <Image
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

      <div className={classnames(styles.section, styles.small)}>
        <CheckBox
          className={styles.checkBox}
          isSelected={fullTimeOnly}
          onSelect={setFullTimeOnly}
          label="Full Time Only"
        />
        <Button type="submit" loading={loading}>
          Search
        </Button>
      </div>
    </form>
  )
}

export default SearchBar
