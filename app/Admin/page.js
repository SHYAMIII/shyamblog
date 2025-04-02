'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
// import { Content } from 'next/font/google';

export default function AdminPage() {
  const router = useRouter();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the token exists in cookies
        const token = Cookies.get('admin_token');
        if (token) {
          // Verify token by making a request to the server
          const response = await fetch('/api/auth/verify', {
            method: 'GET',
            credentials: 'include',
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear it
            Cookies.remove('admin_token');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setError('');
        // Redirect to admin dashboard
        router.push('/Admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      // Call the logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // Clear authentication state
      setIsAuthenticated(false);
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setUploadStatus('Submitting content...');
      
      const res = await fetch('/api/addcontent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          author,
          content,
          slug,
          image,
        }),
      });

      const data = await res.json();
      console.log('Submit response:', data);

      if (res.ok) {
        setUploadStatus('Content created successfully!');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setError(data.message || 'Failed to submit content');
      }
    } catch (error) {
      console.error('Error submitting content:', error);
      setError('Failed to submit content: ' + error.message);
    } finally {
      setUploadStatus('');
    }
  };

  const uploadImage = async (e) => {
    const files = e.target?.files;
    console.log('Files selected:', files);
    if (!files?.length) return;
  
    setIsUploading(true);
    setError('');
    setUploadStatus('Uploading image...');
    
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file);
    }
  
    try {
      console.log('Sending upload request...');
      const res = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Upload response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Upload error response:', errorData);
        throw new Error(errorData.error || 'Failed to upload image');
      }
      
      const data = await res.json();
      console.log('Upload response data:', data);
      
      if (data.links && data.links.length > 0) {
        setImage(data.links[0]);
        setUploadStatus('Image uploaded successfully!');
      } else {
        throw new Error('No image URL returned from server');
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setError(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadStatus('');
      }, 3000);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <form onSubmit={handleLogin} className="p-8  rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium  mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium  mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500  p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button 
          onClick={handleLogout}
          className="text-sm text-gray-600 "
        >
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {uploadStatus && <p className="text-blue-500 mb-4">{uploadStatus}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block mb-2">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block mb-2">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-2">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="6"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            Cover Image
          </label>
          <div 
            className="w-20 h-20 md:w-24 md:h-24 flex flex-col justify-center items-center  rounded-md cursor-pointer "
            onClick={() => document.getElementById('image-upload').click()}
          >
            <span className=" text-xs md:text-sm">
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </span>
            <input 
              id="image-upload"
              type="file" 
              onChange={uploadImage} 
              className="hidden" 
              accept="image/*" 
              disabled={isUploading}
            />
          </div>
          {image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Uploaded image:</p>
              <div className="mt-1">
                <img 
                  src={image} 
                  alt="Cover" 
                  className="max-w-xs h-auto rounded border"
                />
              </div>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500  p-2 rounded hover:bg-blue-600"
          disabled={isUploading}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
