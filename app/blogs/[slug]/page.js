import fs from 'fs'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { reporter } from 'vfile-reporter'

export default async function Page({ params }) {
  const filepath = `content/${params.slug}.md`

  if (!fs.existsSync(filepath)) {
    return notFound()
  }

  const fileContent = fs.readFileSync(filepath, 'utf-8')
  const { content, data } = matter(fileContent)

  const file = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: '👋🌍' })
    .use(rehypeFormat)
    .use(rehypeStringify)

  const htmlContent = (await file.process(content)).toString()

  return (
    <div className="max-w-2xl  mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-gray-600 mt-2">{data.date}</p>
       

      <div>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="prose dark:prose-invert"
        />
      </div>
    </div>
  )
}