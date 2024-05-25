import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="cs logo"
              className="h-12 w-full"
              width={2294}
              height={450}
            />
          </Link>
          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-12 mb-10 border-b border-gray-200 font-semibold">
            <li>
              <a href="/" className="text-gray-700 hover:text-jaffa-600">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className=" text-gray-700 hover:text-jaffa-600">
                About
              </a>
            </li>
            <li>
              <a href="/p2p-coding-bootcamp" className=" text-gray-700 hover:text-jaffa-600">
                P2P Coding Bootcamp
              </a>
            </li>
          </ul>

          <span className="text-sm text-gray-500 text-center block">
            <a href="https://codespirited.com/">Code Spirited</a> 2024, All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
