import { useEffect, useState } from 'react'

import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import api from '../src/api'

import JobCard from '../src/components/job'
import { Layout } from '../src/components/layout'
import SearchBar from '../src/components/searchBar'
import type { JobItem } from '../src/components/job'

import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'
import Button from '../src/components/button'

export default function Home(props: JobsServerSideProps) {
  const { data, meta } = props

  const [clientData, setClientData] = useState(data)
  const [clientMeta, setClientMeta] = useState(meta)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setClientData(data)
  }, [data])

  useEffect(() => {
    setClientMeta(meta)
  }, [meta])

  const hasMoreData =
    clientMeta?.page * clientMeta?.pageSize < clientMeta?.total

  const router = useRouter()

  const onLoadMore = () => {
    setLoading(true)
    console.log({ ...router.query, page: clientMeta.page + 1 })
    api.jobs
      .all({ ...router.query, page: clientMeta.page + 1 })
      .then((res) => {
        setClientData([...data, ...res?.data?.result?.items])
        setClientMeta(res?.data?.result?.meta)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Jobby | Find Your Dream Job</title>
          <meta
            name="description"
            content="We have part-time and full-time jobs hiring now. "
          />
        </Head>

        <div className={styles.searchbar}>
          <SearchBar />
        </div>

        <div className={styles.jobs}>
          {clientData.map((item) => (
            <JobCard item={item} key={item.id} />
          ))}
        </div>

        {hasMoreData && (
          <div className={styles.more}>
            <Button loading={loading} onClick={onLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

type SearchResultMeta = {
  page: number
  pageSize: number
  total: number
}

type JobsServerSideProps = {
  data: Array<JobItem>
  meta: SearchResultMeta
}

export const getServerSideProps: GetServerSideProps<
  JobsServerSideProps
> = async (context: GetServerSidePropsContext) => {
  try {
    const jobs = await api.jobs.all(context.query)

    return {
      props: {
        data: jobs?.data?.result?.items || [],
        meta: jobs?.data?.result?.meta,
      },
    }
  } catch (error) {
    console.warn(error)

    return {
      props: {
        data: [],
        meta: {},
      },
    }
  }
}
