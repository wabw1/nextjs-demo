import Layout from "../../components/layout";
import { getAllIds, getPostsData } from "../../lib/posts"; // 后端获取数据 [{params: {id: 'ssg-ssr'} },...]
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

// 返回所有id的list
export async function getStaticPaths() {
  const paths = getAllIds();
  return {
    paths, // 这个paths属性名不能变
    fallback: false,
  };
}

// 接受一个params参数，利用params.id来fetch一些data
export async function getStaticProps({ params }) {
  // params为地址栏传入的参数params:{ id: xxx}
  const postData = await getPostsData(params.id);
  return {
    props: {
      postData, // postData: postData简写
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>

        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
