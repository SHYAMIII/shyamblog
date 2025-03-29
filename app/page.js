import Link from 'next/link';
import React from 'react';

const Page = () => {
  const posts = [
    {
      id: 1,
      title: 'C tutorials',
      image:"https://w0.peakpx.com/wallpaper/902/931/HD-wallpaper-why-project-managers-need-business-analysts-for-project-success-business-analysis.jpg",
      body: 'This is the body of post 1',
      author: 'Shyam Seshadri',
      date: '2022-01-01'
    },
    {
      id: 2,
      title: 'Full stack script',
      body: 'This is the body of post 2',
      image:"https://png.pngtree.com/thumb_back/fh260/background/20241126/pngtree-symbolizing-the-intricacies-of-project-management-abstract-blue-background-with-gears-image_16658430.jpg",
      author: 'Jane Doe',
      date: '2022-01-02'
    },
    {
      id: 3,
      title: 'Python charge ',
      body: 'This is the body of post 3',
      image:"https://png.pngtree.com/thumb_back/fh260/background/20241126/pngtree-symbolizing-the-intricacies-of-project-management-abstract-blue-background-with-gears-image_16658430.jpg",
      author: 'John Doe',
      date: '2022-01-03'
    },
  ];
  return (
    <main>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            A <span className="font-semibold">free repository</span> for community
            <br className="hidden lg:block" /> components using <span className="font-semibold underline decoration-primary">Tailwind CSS</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Open source Tailwind UI components and templates to
            <br className="hidden lg:block" /> bootstrap your new apps, projects, or landing sites!
          </p>
          <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20">
            
          </div>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg" alt="tailwind css components" className="w-full h-full max-w-md mx-auto" />
        </div>
      </section>

<section className='md:container mx-3  md:mx-auto px-4 rounded-2xl bg-gray-100 dark:bg-[#1b1136] py-10'>
<h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 p-4   md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article 
            key={post.id}
            className=" rounded-lg  dark:bg-gray-950 dark:border-gray-700 shadow-gray-700 transition-all shadow-md hover:shadow-xl overflow-hidden "
          >
            <Link href={`/blog/${post.title}`}>
              <div className="p-6">
                <div className='w-full container mx-auto'>
                  <img className='w-full' src={post.image} alt="image" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm dark:text-gray-500">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="mx-2">•</span>
                  <span>{post.readingTime} min read</span>
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