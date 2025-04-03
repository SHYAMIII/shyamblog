  "use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BlogPage() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch('/api/addcontent');
        const data = await response.json();
        if (data.success) {
          setContents(data.data);
        }
      } catch (error) {
        console.error('Error fetching contents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contents.map((content) => (
            <Link href={`/blogs/${content.slug}`} key={content._id}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {content.image && (
                  <div className="relative h-48 w-full">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {content.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {content.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>By {content.author}</span>
                    <span className="mx-2">•</span>
                    
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}