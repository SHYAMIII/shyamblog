import Link from 'next/link';
import React from 'react';

const Page = () => {
  const posts = [
    {
      id: 1,
      title: 'C tutorials',
      image:"/postimage.png",
      body: 'This is the body of post 1',
      author: 'Shyam Seshadri',
      date: '2022-01-01'
    },
    {
      id: 2,
      title: 'Full stack script',
      body: 'This is the body of post 2',
      image:"/postimage.png",
      author: 'Jane Doe',
      date: '2022-01-02'
    },
    {
      id: 3,
      title: 'Python charge ',
      body: 'This is the body of post 3',
      image:"/postimage.png",
      author: 'John Doe',
      date: '2022-01-03'
    },
    {
      id: 4,
      title: 'Python charge ',
      body: 'This is the body of post 3',
      image:"/postimage.png",
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
<section className="py-16 d  dark:bg-gray-950">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
      Choose Your Plan
    </h2>
    <div className="flex flex-wrap -mx-4">
      {[
        {
          title: "Basic",
          price: "$19",
          features: ["Feature One", "Feature Two", "Feature Three","Feature Four", "Feature Five"],
        },
        {
          title: "Standard",
          price: "$49",
          features: ["Feature One", "Feature Two", "Feature Three", "Feature Four", "Feature Five"],
        },
        {
          title: "Premium",
          price: "$99",
          features: ["Feature One", "Feature Two", "Feature Three", "Feature Four", "Feature Five"],
        },
      ].map((plan, index) => (
        <div key={index} className="w-full container mx-auto md:w-1/3 px-4 mb-8">
          <div className="p-8  dark:bg-gray-900  hover:scale-105 transition-all rounded-lg shadow-lg hover:shadow-xl ">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              {plan.title}
            </h3>
            <p className="text-3xl font-bold text-primary mb-6">{plan.price}/month</p>
            <ul className="mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center mb-2">
                  <span className="text-primary mr-2">✔</span>
                  <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full cursor-pointer hover:scale-105 transition-all py-2 bg-primary text-white rounded-lg hover:bg-primary/40">
              Choose Plan
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
<section className='container  mx-auto px-4 py-10'>
<h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 p-4 focus:outline border  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article 
            key={post.id}
            className=" rounded-lg  dark:bg-gray-950 dark:border-gray-700 hover:scale-105 transition-all shadow-md overflow-hidden hover:shadow-lg "
          >
            <Link href={`/blog/${post.title}`}>
              <div className="p-6">
                <div className='w-full container mx-auto'>
                  <img className='w-full' src={post.image} alt="image" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
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
