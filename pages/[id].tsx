/* eslint-disable @next/next/no-img-element */

import React from 'react'

import api from '../src/api'
import Button from '../src/components/button'
import { Layout } from '../src/components/layout'

import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import styles from '../styles/apply.module.scss'
import classNames from 'classnames'
import Moment from 'react-moment'

const JobDetailsScreen = (props: JobDetailServerSideProps) => {
  const { data } = props

  return (
    <div className={styles.root}>
      <h1 className="hidden-title">
        {data.position} | {data.company}
      </h1>
      <Layout>
        <section className={styles.companyInfo}>
          <h2 className="hidden-title">Company info</h2>
          <div
            style={{ backgroundColor: data.logoBackground }}
            className={styles.logoWrapper}
          >
            <img src={data.logo} alt={data.company} width="100%" />
          </div>
          <div className={styles.content}>
            <div>
              <div className={classNames(styles.heading, styles.companyTitle)}>
                {data.company}
              </div>
              <div className={styles.infoText}>{data.website}</div>
            </div>

            <Button href={data.website} className={styles.companyButton}>
              Company Site
            </Button>
          </div>
        </section>

        <section className={styles.main}>
          <h2 className="hidden-title">About</h2>
          <div className={styles.content}>
            <div>
              <div className={styles.info}>
                <span>
                  <Moment date={data.postedAt} fromNow />
                </span>
                <span className={styles.dot} />
                <span>{data.contract}</span>
              </div>

              <div className={styles.title}>{data.position}</div>

              <div className={styles.location}>{data.location}</div>
            </div>

            <Button href={data.apply} className={styles.button}>
              Apply Now
            </Button>
          </div>

          <p className={classNames(styles.infoText, styles.description)}>
            {data.description}
          </p>

          <section>
            <h3 className={styles.heading}>Requirements</h3>
            <p className={styles.infoText}>{data.requirements.content}</p>
            <div>
              {data.role.items.map((item) => (
                <div key={item} className={styles.list}>
                  <div className={styles.dot} />
                  <div className={styles.infoText}>{item}</div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className={styles.heading}>Waht You Will Do</h3>
            <p className={styles.infoText}>{data.role.content}</p>
            <div>
              {data.role.items.map((item, index) => (
                <div key={item} className={styles.list}>
                  <div className={styles.primary}>{index + 1}</div>
                  <div className={styles.infoText}>{item}</div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </Layout>

      <section className={styles.apply}>
        <h2 className="hidden-title">Apply Now</h2>
        <Layout>
          <div className={styles.content}>
            <div>
              <div className={styles.heading}>{data.position}</div>
              <div className={styles.infoText}>{data.company}</div>
            </div>

            <Button className={styles.button} href={data.apply}>
              Apply Now
            </Button>
          </div>
        </Layout>
      </section>
    </div>
  )
}

export default JobDetailsScreen

type JobDetails = {
  id: number
  company: string
  logo: string
  logoBackground: string
  position: string
  postedAt: string
  contract: string
  location: string
  website: string
  apply: string
  description: string
  requirements: {
    content: string
    items: Array<string>
  }
  role: {
    content: string
    items: Array<string>
  }
}

type JobDetailServerSideProps = {
  data: JobDetails
}

export const getServerSideProps: GetServerSideProps<
  JobDetailServerSideProps
> = async (context: GetServerSidePropsContext) => {
  try {
    const jobs = await api.jobs.one(context.params?.id)

    return {
      props: {
        data: jobs?.data?.result,
      },
    }
  } catch (error) {
    console.warn(error)

    return {
      notFound: true,
    }
  }
}
