'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-4 p-6 mt-4  border dark:border-0  dark:outline-1 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold dark:text-gray-400 text-gray-700 mb-4">
        About This Blog
      </h1>
      <p className="text-lg mb-4">
        Welcome to our programming blog! Here, we share insights, tutorials, and best practices on web development, software engineering, and the latest tech trends.
      </p>
      <p className="text-lg mb-4">
        Whether you're a beginner or an experienced developer, our content aims to provide valuable knowledge that helps you grow in your coding journey.
      </p>
      {showMore && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg mb-4"
        >
          We cover various topics, including JavaScript, Next.js, React, Node.js, and more. Stay tuned for regular updates and feel free to engage with our posts!
        </motion.p>
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'Show Less' : 'Read More'}
      </motion.button>
    </motion.div>
  );
}