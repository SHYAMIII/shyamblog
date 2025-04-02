"use client";
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function Page({ params }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log('Fetching post with slug:', resolvedParams.slug);
        const response = await fetch('/api/addcontent');
        const data = await response.json();
        if (data.success) {
          const foundPost = data.data.find(p => p.slug === resolvedParams.slug);
          if (!foundPost) {
            console.log('Post not found for slug:', resolvedParams.slug);
            notFound();
          }
          console.log('Post found:', foundPost);
          setPost(foundPost);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-gray-600 mb-8">
        <span>{post.author}</span>
        <time dateTime={new Date(post.date).toLocaleDateString()}>
          {new Date(post.date).toLocaleDateString()}
        </time>
      </div>

      {post.image && (
        <img 
          src={post.image}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}

      <div className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}