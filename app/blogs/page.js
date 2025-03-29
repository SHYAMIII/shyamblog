import Link from 'next/link';
// import { blogPosts } from '../data';
import fs, {readfilesync} from 'fs';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

const dirContent = fs.readdirSync("content","utf-8")

  const blogPosts = dirContent.map((fileName) => {
    const fileContent = fs.readFileSync(`content/${fileName}`,"utf-8");
    
    const {data} = matter(fileContent);

    return data
    console.log(data)
  
  })




export default function BlogPage() {
  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold dark:text-white text-gray-900 mb-8">All Blog Posts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article 
              key={post.slug}
              className="dark:bg-gray-950 bg-gray-100 rounded-lg shadow-gray-700 shadow-lg dard:shadow    overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 ">
                <p className="text-sm  mb-2">{post.date}</p>
                <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-3">{post.title}</h2>
                <p className="dark:text-gray-400 text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  href={`/blogs/${post.slug}`}
                  className="inline-block bg-blue-600  px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}