import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { getFile } from './getFile'

export const convertMDToHtml = async (id: string) => {
  const fileContent = await getFile('docs', `${id}.md`)

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContent)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
