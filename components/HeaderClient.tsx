'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import Logout from '@/components/Logout';

const HeaderClient = ({ user }: any) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="bg-gradient-to-br bg-gray-200">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button onClick={toggleNav} className="lg:hidden">
            <Menu className="h-8 w-8 text-gray-700" />
          </button>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="cs logo"
              className="h-8 w-full"
              width={2294}
              height={450}
            />
          </Link>
        </div>
        <nav className="space-x-4 hidden lg:flex">
          <Link
            href="/"
            className="hover:text-jaffa-500 text-gray-700 font-semibold"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-jaffa-500 text-gray-700 font-semibold"
          >
            About
          </Link>
          <Link
            href="/p2p-coding-bootcamp"
            className="hover:text-jaffa-500 text-gray-700 font-semibold"
          >
            P2P Coding Bootcamp
          </Link>
          <Link
            href="/contact"
            className="hover:text-jaffa-500 text-gray-700 font-semibold"
          >
            Contact Us
          </Link>
          {user && (
            <Link
              href="/account"
              className="hover:text-gray-800 text-gray-700 font-semibold"
            >
              Account
            </Link>
          )}
        </nav>
        <div className="flex space-x-3">
          {user ? (
            <Logout />
          ) : (
            <>
              <Link
                href="/login"
                className="border-none px-4 py-2 rounded-full text-gray-700 hover:bg-jaffa-600 hover:text-white transition-all duration-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-jaffa-500 px-4 py-2 rounded-full text-white hover:bg-jaffa-600 transition-all duration-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {isNavOpen && (
        <div className="lg:hidden bg-gray-200 p-4 space-y-2">
          <Link
            href="/"
            className="block hover:text-gray-800 text-gray-700 font-semibold"
            onClick={toggleNav}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block hover:text-gray-800 text-gray-700 font-semibold"
            onClick={toggleNav}
          >
            About
          </Link>
          <Link
            href="/p2p-coding-bootcamp"
            className="block hover:text-gray-800 text-gray-700 font-semibold"
            onClick={toggleNav}
          >
            P2P Coding Bootcamp
          </Link>
          <Link
            href="/contact"
            className="block hover:text-gray-800 text-gray-700 font-semibold"
            onClick={toggleNav}
          >
            Contact Us
          </Link>
          {user && (
            <Link
              href="/account"
              className="block hover:text-gray-800 text-gray-700 font-semibold"
              onClick={toggleNav}
            >
              Account
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderClient;
