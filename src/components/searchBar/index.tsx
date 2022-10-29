import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import classnames from 'classnames'

import styles from './index.module.scss'

import Button from '../button'
import CheckBox from '../checkBox'
import { useRouter } from 'next/router'
import FilterModal from './modal'

const SearchBar = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [fullTimeOnly, setFullTimeOnly] = useState(false)

  const [showFilterModal, setShowFilterModal] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    router.push(
      {
        pathname: '/',
        query: { keyword, location, fullTimeOnly },
      },
      undefined,
      { shallow: false }
    )
  }

  useEffect(() => {
    setKeyword(router.query.keyword?.toString() || '')
    setLocation(router?.query?.location?.toString() || '')
    setFullTimeOnly(router?.query?.fullTimeOnly === 'true')

    if (loading) {
      setLoading(false)
    }
  }, [router])

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

      <div className={styles.mobileActions}>
        <button
          className={styles.filter}
          onClick={() => setShowFilterModal(true)}
          type="button"
        >
          <Image alt="filter" src="/filter.svg" width={32} height={32} />
        </button>

        <Button className={styles.search} type="submit" loading={loading}>
          <Image alt="Search" src="/search-white.svg" width={24} height={24} />
        </Button>
      </div>

      <FilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </form>
  )
}

export default SearchBar
