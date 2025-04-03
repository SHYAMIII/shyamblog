"use client";
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings: ['Coding', 'Programming', 'Web Development', 'Software Engineering', 'Data Science', 'Machine Learning'],
        typeSpeed: 50,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true,
      });
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

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
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            A <span className="font-semibold">Learning Website</span> for community
            <br className="hidden lg:block" /> knowledge using <span className="font-semibold underline decoration-primary"><span ref={el} /></span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Open source blog website to learn skills and new tech trends of web development.
            <br className="hidden lg:block" /> boost your new apps, projects, or landing sites!
          </p>
          <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20">
            
          </div>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img 
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg" 
            alt="tailwind css components" 
            className="w-full h-full max-w-md mx-auto" 
          />
        </div>
      </section>

      <section className='md:container mx-3 md:mx-auto px-4 rounded-2xl bg-gray-100 dark:bg-[#1b1136] py-10'>
        <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article 
              key={post._id}
              className="rounded-lg dark:bg-gray-950 dark:border-gray-700 shadow-gray-700 transition-all shadow-md hover:shadow-xl overflow-hidden"
            >
              <Link href={`/blogs/${post.slug}`}>
                <div className="p-6">
                  <div className='h-48 w-full overflow-hidden'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold m-2 line-clamp-2 ">{post.title}</h2>
                  <p className="text-gray-600 mb-1 line-clamp-3 ">{post.description}</p>
                  <div className="flex items-center text-sm dark:text-gray-500">
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;