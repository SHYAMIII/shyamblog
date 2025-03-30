'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from './theme-btn';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/About' },
    { name: 'Contact', path: '/Contact' },
  ];

  return (
    <>
      <nav className="backdrop-blur bg-background/50 z-10 sticky top-0 border-gray-400 relative">
        <div className="max-w-7xl py-0 mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold">ShyamBlog</span>
              <span className="ml-3 md:hidden">
                <ModeToggle />
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="hover:-translate-y-1 transition-all px-3 rounded-md text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="mx-3 items-center flex border px-3 py-1 hover:bg-blue-950 transition-all text-sm font-medium rounded-full"
              >
                Signup
              </Link>
              <Link
                href="/"
                className="mx-3 items-center flex border px-3 py-1 hover:bg-blue-950 transition-all text-sm font-medium rounded-full"
              >
                Login
              </Link>
              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 relative transition-colors duration-300"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`h-6 w-6 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`h-6 w-6 absolute transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-background/50 backdrop-blur border-b border-gray-400 transform transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className=" font-bold hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-2 px-3 space-y-2">
              <Link
                href="/"
                className="w-full block text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-300 px-3 py-2"
              >
                Signup
              </Link>
              <Link
                href="/"
                className="w-full block text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-300 px-3 py-2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for other content */}
      <div
        className={`fixed inset-0 z-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}
