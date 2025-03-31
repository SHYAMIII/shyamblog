'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    date: '',
  });
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const adminCredentials = {
    username: 'admin',
    password: 'admin123',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginData.username === adminCredentials.username &&
      loginData.password === adminCredentials.password
    ) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
      setIsAuthenticated(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitted Data:', formData);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleLogin} className=" p-6 rounded shadow-md w-80">
          <h2 className="text-lg font-bold mb-4">Admin Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 mb-2 border rounded"
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border rounded"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <button className="w-full bg-blue-500  p-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <form onSubmit={handleSubmit} className=" p-6 rounded shadow-md">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          className="w-full p-2 mb-2 border rounded"
          value={formData.slug}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 mb-2 border rounded"
          value={formData.date}
          onChange={handleInputChange}
        />
        <button className="w-full bg-green-500  p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
