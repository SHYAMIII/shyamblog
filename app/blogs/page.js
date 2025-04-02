"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/addcontent');
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold dark:text-white text-gray-900 mb-8">All Blog Posts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article 
              key={post._id}
              className="dark:bg-gray-950 bg-gray-100 rounded-lg shadow-gray-700 shadow-lg dard:shadow overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                {/* <p className="text-sm mb-2">{new Date(post.date).toLocaleDateString()}</p> */}
                <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-3">{post.title}</h2>
                <p className="dark:text-gray-400 text-gray-600 mb-4">{post.description}</p>
                <Link 
                  href={`/blogs/${post.slug}`}
                  className="inline-block bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
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