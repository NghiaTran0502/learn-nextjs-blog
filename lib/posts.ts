import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDerectory = path.join(process.cwd(), "posts");

export function getSortedPostData() {
  //Get file names under /posts

  const fileNames = fs.readdirSync(postsDerectory);
  const allPostsData = fileNames.map((fileName) => {
    //Remoce ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDerectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    //Use gray-matter to parse the post metadata secton
    const matterResult = matter(fileContents);

    //Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; tilte: string }),
    };
  });

  //Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDerectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: any) {
  const fullPath = path.join(postsDerectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; tilte: string }),
  };
}
