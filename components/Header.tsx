import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/Logout";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

const Header = async () => {
  const user = await AuthGetCurrentUserServer();
  
  if (user) {
    revalidatePath("/");
  }
  
  return (
    <header className="bg-gradient-to-br from-[#FFD3A8] via-[#FFB370] to-[#FF8736]">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="cs logo"
            className="h-8 w-full"
            width={2294}
            height={450}
          />
        </Link>
        <nav className="space-x-4 hidden lg:flex">
          <Link
            href="/"
            className="hover:text-gray-800 text-gray-700 font-semibold"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-800 text-gray-700 font-semibold"
          >
            About
          </Link>
          <Link
            href="/p2p-coding-bootcamp"
            className="hover:text-gray-800 text-gray-700 font-semibold"
          >
            P2P Coding Bootcamp
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
                className="border-none px-4 py-2 rounded-full text-white hover:bg-jaffa-600 hover:text-white transition-all duration-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-jaffa-600 px-4 py-2 rounded-full text-white hover:bg-jaffa-700 transition-all duration-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
