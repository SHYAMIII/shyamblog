'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Message);
    setSubmitted(true);
    // Here, you can integrate with an API or backend service to handle form submissions
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'Name':
        setName(value);
        break;
      case 'Email':
        setEmail(value);
        break;
      case 'Message':
        setMessage(value);
        break;
    }
  };

  return (
    <div className="max-w-3xl  p-6 dark:text-gray-300 md:mx-auto mx-3 dark:bg-gray-900 mt-8 shadow-blue-700 shadow-lg border rounded-xl text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-6">Have any questions or suggestions? Feel free to reach out!</p>
      {submitted ? (
        <p className="text-green-600 text-lg">Thank you for your message! We&#39;ll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="Name" 
            value={Name} 
            onChange={handleChange} 
            placeholder="Your Name" 
            className="w-full  p-2 border border-gray-300 rounded-md" 
            required 
          />
          <input 
            type="email" 
            name="Email" 
            value={Email} 
            onChange={handleChange} 
            placeholder="Your Email" 
            className="w-full  p-2 border border-gray-300 rounded-md" 
            required 
          />
          <textarea
            name="Message"
            value={Message} 
            onChange={handleChange} 
            placeholder="Your Message" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            rows="4" 
            required 
          ></textarea>
          <button 
            type="submit" 
            className="px-4  py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}