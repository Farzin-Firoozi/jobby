import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import api from '../src/api'

import JobCard from '../src/components/job'
import { Layout } from '../src/components/layout'
import SearchBar from '../src/components/searchBar'
import type { JobItem } from '../src/components/job'

import styles from '../styles/Home.module.scss'

export default function Home(props: JobsServerSideProps) {
  const { data } = props

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

        <SearchBar />

        <div className={styles.jobs}>
          {data.map((item) => (
            <JobCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

type JobsServerSideProps = {
  data: Array<JobItem>
}

export const getServerSideProps: GetServerSideProps<
  JobsServerSideProps
> = async (context: GetServerSidePropsContext) => {
  try {
    const jobs = await api.jobs.all(context.query)

    return {
      props: {
        data: jobs?.data?.result?.items || [],
      },
    }
  } catch (error) {
    console.warn(error)

    return {
      props: {
        data: [],
      },
    }
  }
}
