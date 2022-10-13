import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/posts"; // 导入后端的函数

// 导出getStaticProps
export async function getStaticProps() {
  const allPosts = getSortedPostsData();
  return {
    props: {
      allPosts,
    },
  };
}

//  data直接就是获得的作为props传进来的属性
export default function Home({ allPosts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>IO
      </Head>
      <section className={utilStyles.headingMd}>
        <p>这是第一个wabw1的nextjs应用</p>
        <p>
          (用以下链接可以创建一个新next-app)
          <a href="https://nextjs.org/learn">Tutorial</a>
        </p>
      </section>

      {/*  blog展示区 */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({ id, title, date }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
