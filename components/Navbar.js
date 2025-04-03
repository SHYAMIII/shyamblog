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
      <nav className="backdrop-blur bg-background/50 z-10 sticky top-0 border-b border-gray-400">
        <div className="max-w-7xl py-2 mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">ShyamBlog</span>
              <span className="ml-3 md:hidden">
                <ModeToggle />
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="hover:-translate-y-1 transition-all px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href={'/Admin'} 
                className="px-4 py-2 text-sm font-medium rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Admin
              </Link>
              <Link
                href="https://github.com/shyamiii" 
                target='_blank'
                className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Github
              </Link>
              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary relative transition-colors"
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
          className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur border-b border-gray-400 transform transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/Admin"
              className="block px-3 py-2 rounded-md text-base font-medium bg-red-500 hover:bg-red-600 text-white transition-colors mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <Link
              href="https://github.com/shyamiii"
              target="_blank"
              className="block px-3 py-2 rounded-md text-base font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Github
            </Link>
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
