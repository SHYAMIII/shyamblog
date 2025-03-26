'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from './theme-btn';


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="backdrop-blur bg-background/50 z-10 sticky top-0 border-b  border-gray-400">
            <div className="max-w-7xl  mx-auto px-4">
                <div className="flex justify-between items-center h-12">
                    {/* Logo */}
                    <div className="flex-shrink-0 ">
                        <span className="text-2xl font-bold ">ShyamBlog</span>
                        <span className='ml-3  md:hidden'>
                        <ModeToggle/>
                    </span>

                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className=" hover:-translate-y-1 transition-all px-3  rounded-md text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className='mx-3 items-center flex border px-3 py-1 hover:bg-blue-950 transition-all text-sm font-medium rounded-4xl '>Signup</Link>
                        <Link href="/" className='mx-3 items-center flex border px-3 py-1 hover:bg-blue-950 transition-all text-sm font-medium rounded-4xl '>Login</Link>
                        <ModeToggle/>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <span>
                    <Link href="/" className='mx-3 text-sm font-medium rounded-md '>Signup</Link>
                    <Link href="/" className='mx-3 text-sm font-medium rounded-md '>Login</Link>

                    </span>
                    
                    

                </div>
            </div>
        </nav>
    );
}