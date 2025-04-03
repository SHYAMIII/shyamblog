"use client";
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';
import { use } from 'react';

export default function BlogPost({ params }) {
  const resolvedParams = use(params);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('/api/addcontent');
        const data = await response.json();
        const foundPost = data.data.find(p => p.slug === resolvedParams.slug);
        
        if (!foundPost) {
          notFound();
        }
        
        setPost(foundPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen py-12 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8">
              <span className="mr-4">By {post.author}</span>
              {/* <time dateTime={new Date(post.date).toLocaleTimeString()}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time> */}
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:dark:text-gray-100 prose-p:dark:text-gray-300 prose-strong:dark:text-white prose-a:dark:text-blue-400">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={`${className} dark:bg-gray-700 dark:text-gray-200`} {...props}>
                        {children}
                      </code>
                    );
                  },
                  img: ({ node, ...props }) => (
                    <img
                      src={props.src}
                      alt={props.alt}
                      width={800}
                      height={400}
                      className="rounded-lg dark:brightness-90"
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}