// 这是后端从文件系统读数据的操作
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark"; //获取md文件的content
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// 导出排序号的 getSortedPostData（用于给Home展示)
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory); // 获取两个文件里的所有数据
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

// 返回所有id的list
export function getAllIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ""),
    },
  }));
}

// 根据id获取data对象
export async function getPostsData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  // 获取内容
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data, //meta data （spread语法 把多个对象展开
  };
}
