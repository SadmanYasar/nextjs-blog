import Link from 'next/link'
import Date from '@/components/date'
import Head from 'next/head'
import Layout, { siteTitle } from '@/components/layout'
import utilStyles from '@/styles/utils.module.css'
import { getSortedPostsData } from '@/utils/mdxUtils'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi! I am a Computer Science undergraduate student at UTM. Here, you will find my thoughts and anything that I find interesting to write on, mostly tech related. 👨‍💻</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map((post) => (
            <li className={utilStyles.listItem} key={post.filePath}>
              <Link as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}>
                <a>{post.data.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={post.data.date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}